export default {
    name: "user",
    title: "User",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string",
        },
        {
            name: "gender",
            title: "Gender",
            type: "array",
            of: [
                { 
                    type: "string" 
                }
            ],
            options: {
              list: [
                { 
                    title: "Male", 
                    value: "male",
                },
                { 
                    title: "Female", 
                    value: "female",
                },
              ],

              layout: "checkbox",

            },
          },
        {
            name: "age",
            title: "Age",
            type: "number",
        },
        {
            name: "previous_purchases",
            title: "Previous Purchases",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "reference",
                            title: "Reference",
                            type: "string",
                        }
                    ]
                }
            ]
        },
        {
            name: "whishlist",
            title: "Whishlist",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "reference",
                            title: "Reference",
                            type: "string",
                        }
                    ]
                }
            ]
        }
    ]
}