export default {
    name: "event",
    title: "Event",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "apiid",
            title: "API id",
            type: "string",
        },
        {
            name: "category",
            title: "Category",
            type: "string",
            options: {
                list: [
                    {
                        title: "Sport",
                        value: "sport"
                    },
                    {
                        title: "Show",
                        value: "show"
                    },
                    {
                        title: "Festival",
                        value: "festival"
                    },
                ],
                
                layout: "radio",
            }
        }
    ]
}