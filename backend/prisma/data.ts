import { Prisma } from '@prisma/client'

export const schools = [
    {
        name: 'University of Calgary',
        domain: 'ucalgary.ca'
    }
];

export const users = [
    {
        username: 'john_doe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'hashed-password123',
        yearOfStudy: 1,
        schoolId: 1,
        otp: "234123",
        jwt: "",
        status: true
    },
    {
        username: 'jane_smith',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        password: 'hashed-password4569',
        yearOfStudy: 2,
        schoolId: 1,
        otp: "234123",
        jwt: "",
        status: true
    },
    {
        username: 'tom_dee',
        firstName: 'Tom',
        lastName: 'Dee',
        email: 'tom@example.com',
        password: 'hashed-password1238',
        yearOfStudy: 3,
        schoolId: 1,
        otp: "234123",
        jwt: "",
        status: true
    },
    {
        username: 'tiffany_smalls',
        firstName: 'Tiffany',
        lastName: 'Smalls',
        email: 'tiffany@example.com',
        password: 'hashed-password4560',
        yearOfStudy: 4,
        schoolId: 1,
        otp: "234123",
        jwt: "",
        status: true
    },

];

export const events = [
    {

        userId: 3,
        title: 'Event 1',
        description: 'First event description.',
        location: 'Event Location 1',
        startTime: '2023-12-01T09:00:00Z',
        endTime: '2023-12-01T18:00:00Z',
        // Other event details
    },
    {
        userId: 4,
        title: 'Event 2',
        description: 'Second event description.',
        location: 'Event Location 2',
        startTime: '2023-12-15T10:00:00Z',
        endTime: '2023-12-15T16:00:00Z',

    },
    {
        userId: 4,
        title: 'Event 3',
        description: 'Third event description.',
        location: 'Event Location 3',
        startTime: '2023-12-17T10:00:00Z',
        endTime: '2023-12-17T16:00:00Z',
    },
];

export const userEventResponses =  [
    {
        userId: 1,
        eventId: 1,
        participationStatus: 'Not Coming'
    },
    {
        userId: 1,
        eventId: 2,
        participationStatus: 'Not Coming'
    },
    {
        userId: 1,
        eventId: 3,
        participationStatus: 'Not Coming'
    },
    {
        userId: 2,
        eventId: 1,
        participationStatus: 'Not Coming'
    },
    {
        userId: 2,
        eventId: 2,
        participationStatus: 'Coming'
    },
    {
        userId: 2,
        eventId: 3,
        participationStatus: 'Not Coming'
    },
    {
        userId: 3,
        eventId: 1,
        participationStatus: 'Coming'
    },
    {
        userId: 3,
        eventId: 2,
        participationStatus: 'Not Coming'
    },
    {
        userId: 3,
        eventId: 3,
        participationStatus: 'Not Coming'
    },
    {
        userId: 4,
        eventId: 1,
        participationStatus: 'Not Coming'
    },
    {
        userId: 4,
        eventId: 2,
        participationStatus: 'Coming'
    },
    {
        userId: 4,
        eventId: 3,
        participationStatus: 'Coming'
    },
];


export const posts = [
    {
        userId: 3,
        title: 'First Post',
        text: 'This is the first post!',
        // Other post details
    },
    {
        userId: 4,
        title: 'Second Post',
        text: 'Another post here!',
        // Other post details
    },
];

export const comments = [
    {
        userId: 1,
        postId: 1,
        text: 'This is the first comment!',
        // Other post details
    },
    {
        userId: 2,
        postId: 2,
        text: 'Another post here!',
        // Other post details
    },
];

export const organizations = [
    {
        organizationName: 'Group A',
        description: 'Description for Group A.',
        status: 'Active',
    },
    {
        organizationName: 'Group B',
        description: 'Description for Group B.',
        status: 'Active',
    },
];

export const userOrganizationRoles = [
    {
        userId: 1,
        organizationId: 1,
        roleId: 2,
    },
    {
        userId: 2,
        organizationId: 2,
        roleId: 2,
    },
    {
        userId: 3,
        organizationId: 1,
        roleId: 1,
    },
    {
        userId: 4,
        organizationId: 2,
        roleId: 1,
    },

]

export const roles = [
    {
        roleName: 'Admin',
    },
    {
        roleName: 'Member',

    },
];

export const organizationRolePermissions = [
    {
        organizationId: 1,
        roleId: 1,
        permissionId: 1,
    },
    {
        organizationId: 2,
        roleId: 1,
        permissionId: 1,
    },
];

export const permissions = [
    {
        permissionName: 'Founder',
    },
];

export const enrollments = [
    {
        programId: 1,
        userId: 1,
        degreeType: 'Bachelor',
        // Other enrollment details
    },
    {
        programId: 2,
        userId: 2,
        degreeType: 'Bachelor',
        // Other enrollment details
    },
    {
        programId: 3,
        userId: 3,
        degreeType: 'Bachelor',
        // Other enrollment details
    },
    {
        programId: 4,
        userId: 4,
        degreeType: 'Bachelor',
    },

];

export const programs = [
    {
        programName: 'Computer Science',
        department: 'Science Department',
        // Other program details
    },
    {
        programName: 'Business Administration',
        department: 'Business Department',
        // Other program details
    },
    {
        programName: 'Engineering',
        department: 'Engineering Department',
        // Other program details
    },
    {
        programName: 'Education',
        department: 'Education Department',
    },

];

export const topics = [
    {
        topicName: 'computer',
    },
    {
        topicName: 'business',
    },
    {
        topicName: 'engineer',
    },
    {
        topicName: 'teacher',
    },
]
export const eventTags = [
    {
        eventId: 1,
        topicId: 3,
    },
    {
        eventId: 2,
        topicId: 4,
    },
    {
        eventId: 3,
        topicId: 4,
    },
]
export const postTags = [
    {
        postId: 1,
        topicId: 2 ,
    },
    {
        postId: 2,
        topicId: 1 ,
    },
]
export const topicSubscriptions = [
    {
        userId: 1,
        topicId: 1,
    },
    {
        userId: 2,
        topicId: 2,
    },
    {
        userId: 3,
        topicId: 3,
    },
    {
        userId: 4,
        topicId: 4,
    },
]



