const { buildSchema } = require("graphql");

module.exports = buildSchema(`
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

    type RootQuery {
        users: [User!]!
        profiles: [Profile!]!
        login(email: String!, password: String!): AuthLogin!
        me: Profile!
    }

    type RootMutation {
        createUser(userinput: inputUser): User!
        createProfile(profileinput: inputProfile): Profile!
        addExperience(expinput: inputExp): Profile!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    } 
`);
