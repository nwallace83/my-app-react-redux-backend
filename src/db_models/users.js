db.createCollection("users", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["userName","password","role"],
            properties: {
                userName: {
                    bsonType: "string",
                    description: "username"
                },
                password: {
                    bsonType: "string",
                    description: "password"
                },
                role: {
                    enum: ["USER","ADMIN"],
                    description: "role"
                }
            }
        }
    },
    validationLevel: "strict",
    validationAction: "error"
})