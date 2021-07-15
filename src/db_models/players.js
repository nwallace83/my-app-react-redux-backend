db.createCollection("players", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["playerName","playerClass","protected"],
            properties: {
                playerName: {
                    bsonType: "string",
                    description: "Must be unique player name"
                },
                playerClass: {
                    enum: ["Death Knight","Demon Hunter","Druid","Hunter","Mage","Monk","Paladin","Priest","Rogue","Shaman","Warlock","Warrior"],
                    description: "Must be a valid class name"
                },
                protected: {
                    type: "boolean",
                    description: "Protect user from deletion"
                }
            }
        }
    }
})

db.players.insertMany([
{playerName:"Morelynn", playerClass:"Mage" , protected: true},
{playerName: "Kavion", playerClass:"Demon Hunter" , protected: true},
{playerName: "Askr", playerClass: "Warlock" , protected: true},
{playerName: "Evileternal", playerClass: "Hunter" , protected: true},
{playerName: "Laterr", playerClass: "Shaman" , protected: true},
{playerName: "Morelynn", playerClass: "Mage" , protected: true},
{playerName: "Phõenîx", playerClass: "Warlock" , protected: true},
{playerName: "Sadr", playerClass: "Mage" , protected: true},
{playerName: "Steams", playerClass: "Druid" , protected: true},
{playerName: "Xxwillow", playerClass: "Shaman" , protected: true},
{playerName: "Asariya", playerClass: "Rogue" , protected: true},
{playerName: "Chadra", playerClass: "Paladin" , protected: true},
{playerName: "Deprêssion", playerClass: "Monk" , protected: true},
{playerName: "Morelyn", playerClass: "Demon Hunter" , protected: true},
{playerName: "Navesauce", playerClass: "Demon Hunter" , protected: true},
{playerName: "Nghtpayne", playerClass: "Rogue" , protected: true},
{playerName: "Norivanddra", playerClass: "Death Knight" , protected: true},
{playerName: "Potató", playerClass: "Paladin" , protected: true},
{playerName: "Stealthpatch", playerClass: "Rogue" , protected: true},
{playerName: "Stuttùr", playerClass: "Warrior" , protected: true},
{playerName: "Voxsiph", playerClass: "Rogue" , protected: true},
{playerName: "Èvi", playerClass: "Monk" , protected: true},
{playerName: "Èvie", playerClass: "Shaman"}
])