import {
  AppPermissionName,
  Organization,
  Permission,
  UserRole,
  OrganizationStatus,
  UserOrgStatus,
  User,
  UserType,
} from "@prisma/client";
import prisma from "../prisma/client";
import { OrganizationCreateType } from "../../shared/zodSchemas";
import { defaultRolePermissions } from "../constants";
import { AppError, AppErrorName } from "../utils/AppError";
import UploadToS3, { generateUniqueFileName } from "../utils/S3Uploader";

// Creates a new organization and add the default role permissions
// This messy but it works for now
export const createOrganizationWithDefaults = async (
  organizationData: OrganizationCreateType,
  userId: string,
  file?: Express.Multer.File,
): Promise<Organization | undefined> => {
  let newOrganization: Organization | undefined;

  // Fetch default permissions from the permission table in database
  const defaultPermissions = await fetchDefaultPermissions(
    defaultRolePermissions,
  );

  // start transaction
  await prisma.$transaction(async (tx) => {
    // Create the organization
    newOrganization = await tx.organization.create({
      data: {
        ...organizationData,
        status: OrganizationStatus.Pending,
      },
    });

    // upload the image
    if (file) {
      const uniqueFileName = generateUniqueFileName(
        file.originalname,
        newOrganization.id,
      );
      const path = `images/organizations/${uniqueFileName}`;

      await UploadToS3(file!, path);

      // Update organization with image path after successful upload
      newOrganization = await tx.organization.update({
        where: { id: newOrganization.id },
        data: {
          image: path,
        },
      });
    }

    const newOrgId = newOrganization.id;

    // Get roleId of the Owner role
    const roleId = (
      await tx.role.findFirst({
        where: {
          roleName: UserRole.Owner,
        },
      })
    )?.id;

    if (roleId) {
      // Set the user as the owner of the organization
      await tx.userOrganizationRole.create({
        data: {
          userId,
          organizationId: newOrgId,
          roleId: roleId,
          status: UserOrgStatus.Pending,
        },
      });
    } else {
      // This should never happen
      throw new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        `RoleId for ${UserRole.Owner} not found`,
        404,
        true,
      );
    }

    // associate default permissions with the newly created organization for each role
    await Promise.all(
      // promise.all used to manage concurrency due to the multiple async operations. Here we await the return of all role-related operations

      // iterate over each role and its associated permissions
      Object.entries(defaultRolePermissions).map(
        async ([roleName, permissions]) => {
          // fetch the roleId corresponding to the roleName from db
          const roleId = (
            await tx.role.findFirst({
              // need to use type assertion here so typescript knows its a valid enum key
              where: {
                roleName: UserRole[roleName as keyof typeof UserRole],
              },
            })
          )?.id;

          if (roleId && newOrganization) {
            await Promise.all(
              // await the return of all permission-related operations for a specific role
              // iterate over the permissions for the role
              permissions.map(async (permission) => {
                // fetch the permissionId corresponding the permission in current iteration
                const permissionId = defaultPermissions.find(
                  (p) => p.permissionName === permission,
                )?.id;

                if (permissionId) {
                  // create records to associate org with its roles and permissions
                  await tx.organizationRolePermission.create({
                    data: {
                      organizationId: newOrgId,
                      roleId,
                      permissionId,
                    },
                  });
                }
              }),
            );
          }
        },
      ),
    );
  }); // end of prisma transaction

  //TODO: send email to (admins?) about a new pending organization

  return newOrganization;
};

// Get the permission record for each value in rolePermissions
export async function fetchDefaultPermissions(
  rolePermissions: Record<UserRole, readonly AppPermissionName[]>,
): Promise<Permission[]> {
  // call slice() to create shallow copy so we can deal with read only role permissions
  const allPermissions = Object.values(rolePermissions).flat().slice();
  return prisma.permission.findMany({
    where: {
      permissionName: {
        in: allPermissions,
      },
    },
  });
}

// Approve a user's request to join the organization
export async function approveUserRequest(
  user: User,
  organizationId: string,
  roleId: string,
) {
  await prisma.$transaction(async (tx) => {
    // change user account status to "ApprovedOrg"
    if (user.accountType === UserType.PendingOrg) {
      const updatedUser = await tx.user.update({
        where: {
          id: user.id,
        },
        data: {
          accountType: UserType.ApprovedOrg,
        },
      });
    }

    // Change user role status in the organization to approved
    await tx.userOrganizationRole.update({
      where: {
        userId_organizationId_roleId: {
          userId: user.id,
          organizationId,
          roleId,
        },
      },
      data: {
        status: UserOrgStatus.Approved,
      },
    });
  });
}

// Reject a user's request to join the organization
export async function rejectUserRequest(
  user: User,
  organizationId: string,
  roleId: string,
) {
  await prisma.$transaction(async (tx) => {
    // Delete the user's role in the organization
    await tx.userOrganizationRole.delete({
      where: {
        userId_organizationId_roleId: {
          userId: user.id,
          organizationId,
          roleId,
        },
      },
    });

    // Delete the user if they have not been previously approved
    if (user.accountType === UserType.PendingOrg) {
      await tx.user.delete({
        where: {
          id: user.id,
        },
      });
    }
  });
}

// Approve the creation of a new organization
export async function approveOrganizationRequest(
  organizationId: string,
  user: User,
  roleId: string,
) {
  await prisma.$transaction(async (tx) => {
    // Approve the organization
    const updatedOrg = await tx.organization.update({
      where: {
        id: organizationId,
      },
      data: {
        status: OrganizationStatus.Approved,
      },
    });

    // Approve the user's account (if org account)
    if (user.accountType === UserType.PendingOrg) {
      const updatedUser = await tx.user.update({
        where: {
          id: user.id,
        },
        data: {
          accountType: UserType.ApprovedOrg,
        },
      });
    }

    // Approve the owner's role
    await tx.userOrganizationRole.update({
      where: {
        userId_organizationId_roleId: {
          userId: user.id,
          organizationId,
          roleId,
        },
      },
      data: {
        status: UserOrgStatus.Approved,
      },
    });
  });
}

// Reject the creation of a new pending organization
export async function rejectOrganizationRequest(
  organizationId: string,
  user: User,
) {
  await prisma.$transaction(async (tx) => {
    // Delete the organization
    await tx.organization.delete({
      where: {
        id: organizationId,
      },
    });

    // Delete user account if is hasn't been approved previously
    if (user.accountType === UserType.PendingOrg) {
      await tx.user.delete({
        where: {
          id: user.id,
        },
      });
    }
  });
}
