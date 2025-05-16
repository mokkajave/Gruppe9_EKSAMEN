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
            name: "image",
            title: "User Photo",
            type: "image",
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
            validation: Rule => Rule.min(2).error("Minimun age is 2"),
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