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
            // Legger til bruker-bilde også, slik at dette kan fetches ut på Dashboard siden senere
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
            /*
            Setter bruker min. alder til 2 år, da det er vanlig policy for billettutsalg orginisasjoner. 
            For å implementere et regelsett på min. alder i Sanity, fikk jeg inspirasjon fra dette nettstedet:
            https://www.knutmelvaer.no/blog/2020/04/a-practical-application-of-the-web-project-book/
            */
            validation: Rule => Rule.min(2).error("Minimun age is 2"),
        },
        {
            // I Sanity kan man nå lage liste på tidligere kjøp, og har direkte referanse til event lagret i Sanity
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
            // Fungerer på samme måte som tidligere kjøp, kan legge til event i ønskelisten
            name: "wishlist",
            title: "Wishlist",
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