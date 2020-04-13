const { buildSchema } = require("graphql");

module.exports = buildSchema(`

    type Message {
        message: String
    }

    type User {
        _id: ID!
        name: String!
        email: String!
        password: String
        avatar: String
        date: String!
    }

    type Profile {
        _id: ID!
        user: User!
        company: String
        website: String
        location: String
        status: String!
        skills: [String!]!
        bio: String
        githubusername: String
        social : Social
        experience: [Experience]
        education: [Education]
        date: String
    }

    type Social {
        youtube: String
        twitter: String
        facebook: String
        linkedin: String
        instagram: String
    }

    type Experience {
        title: String!
        company: String!
        location: String!
        from: String
        to: String
        current: Boolean
        description: String
    }

    type Education {
        school: String!
        degree: String!
        fieldofstudy: String!
        from: String!
        to: String
        graduated: Boolean
        description: String
    }

    type AuthLogin {
        token: String!
    }

    input inputUser {
        name: String!
        email: String!
        password: String!
    }

    input inputProfile {
        company: String
        website: String
        location: String
        status: String!
        skills: String!
        bio: String
        githubusername: String
        social: inputSocial
        date: String
    }

    input inputSocial {
        youtube: String
        twitter: String
        facebook: String
        linkedin: String
        instagram: String
    }
    
    input inputExp {
        title: String!
        company: String!
        location: String!
        from: String
        to: String
        current: Boolean
        description: String
    }

    input inputEd {
        school: String!
        degree: String!
        fieldofstudy: String!
        from: String!
        to: String
        graduated: Boolean
        description: String
    }

    type RootQuery {
        users: [User!]!
        login(email: String!, password: String!): AuthLogin!
        profiles: [Profile!]!
        findProfile(id: String!): Profile!
        me: Profile!
    }

    type RootMutation {
        createUser(user_input: inputUser): User!
        deleteUser: Message
        createProfile(profile_input: inputProfile): Profile!
        addExperience(exp_input: inputExp): Profile!
        deleteExperience(exp_id: String!): Profile!
        addEducation(ed_input: inputEd): Profile!
        deleteEducation(ed_id: String!): Profile!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    } 
`);
