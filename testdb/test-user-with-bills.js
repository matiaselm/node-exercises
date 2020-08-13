const TESTUSERS = [
    {
        "id": 1,
        "name": "Matias Jalava",
        "address": "Siltakuja",
        "postalnum": "02770",
        "city": "Espoo",
        "phonenum": "050777777",
        "bills": [
            {
                "id": 1,
                "sum": 399,
                "date": "Wed Mar 25 2015 02:00:00 GMT+0200",
                "topic": "rent",
                "paid": "false"
            },
            {
                "id": 2,
                "sum": 2000,
                "date": "Wed Mar 25 2015 02:00:00 GMT+0200",
                "topic": "car",
                "paid": "false"
            },
            {
                "id": 3,
                "sum": 23,
                "date": "Wed Mar 25 2015 02:00:00 GMT+0200",
                "topic": "fishing equipment loan",
                "paid": "false"
            }
        ]
    },
    {
        "id": 2,
        "name": "Tuomas",
        "address": "Tapialantie",
        "postalnum": "14240",
        "city": "Janakkala",
        "phonenum": "050555555",
        "bills": []
    },
    {
        "id": 3,
        "name": "Nelli",
        "address": "Carlanderintie",
        "postalnum": "04500",
        "city": "Kellokoski",
        "phonenum": "050666666",
        "bills": [
            {
                "id": 1,
                "sum": 399,
                "date": "Wed Mar 25 2015 02:00:00 GMT+0200",
                "topic": "rent",
                "paid": "false"
            },
            {
                "id": 2,
                "sum": 10,
                "date": "Wed Mar 25 2015 02:00:00 GMT+0200",
                "topic": "Something",
                "paid": "false"
            },
            {
                "id": 3,
                "sum": 500,
                "date": "Wed Mar 25 2015 02:00:00 GMT+0200",
                "topic": "Student loan",
                "paid": "false"
            },
            {
                "id": 4,
                "sum": 10,
                "date": "Wed Mar 25 2015 02:00:00 GMT+0200",
                "topic": "Something2",
                "paid": "false"
            }
        ]
    }]

module.exports = TESTUSERS