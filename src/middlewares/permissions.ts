import { shield, rule, and, not } from "graphql-shield";


const isAuthenticated = rule({cache: "contextual"})(async (parent, args, ctx, info) => {
    return ctx.user !== null;
});

const allow = (allowedRoles: string[]) => rule({cache: "contextual"})(async (parent, args, ctx, info) => {
    return allowedRoles.includes(ctx.user.role)
});

export const permissions = shield({
    Query: {
        login: not(isAuthenticated),
        depts: and(isAuthenticated, allow(['admin'])),
        searchUsers: and(isAuthenticated, allow(['admin', 'hod', 'pc', 'cc'])),
        programs: and(isAuthenticated, allow(['admin'])),
        courses: and(isAuthenticated, allow(['admin'])),
        dept: and(isAuthenticated, allow(['admin', 'hod'])),
        program: and(isAuthenticated, allow(['admin', 'pc'])),
        course: and(isAuthenticated, allow(['admin', 'cc'])),
        '*': isAuthenticated,
    },
    Mutation: {
        createDept: and(isAuthenticated, allow(['admin'])),
        createUser: and(isAuthenticated, allow(['admin', 'hod'])),
        createCourse: and(isAuthenticated, allow(['admin'])),
        createProgram: and(isAuthenticated, allow(['hod'])),
        attachCourses: and(isAuthenticated, allow(['pc'])),
        createSection: and(isAuthenticated, allow(['pc'])),
        // uploadUsers: and(isAuthenticated, allow(['admin', 'hod'])),
        // uploadStudents: and(isAuthenticated, allow(['admin', 'hod'])),
    }
})