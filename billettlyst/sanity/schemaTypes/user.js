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
                { 
                    title: "Other", 
                    value: "other",
                },
              ],

              layout: "radio",

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
                    type: "reference",
                    to: [
                        {
                            type: "event"
                        }
                    ],
                }
            ]
        },
        {
            name: "whishlist",
            title: "Whishlist",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: [
                        {
                            type: "event"
                        }
                    ],
                }
            ]
        }
    ]
}