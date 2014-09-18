var PostalItemTypes = [
    {
        name: 'Letter',
        id: 'letter',
        maxWeight: 0.1
    },
    {
        name: 'Large Letter',
        id: 'large_letter',
        maxWeight: 0.75
    },
    {
        name: 'Small Parcel',
        id: 'small_parcel',
        maxWeight: 2
    },{
        name:'Medium Parcel',
        id: 'medium_parcel',
        maxWeight: 20
    }
];

var PostalServiceTypes = {
    'Royal Mail 1st Class': {
        signed: false,
        class: 1
    },
    'Royal Mail 2nd Class' : {
        signed: false,
        class: 2
    },
    'Royal Mail Signed For 1st Class': {
        signed: true,
        class: 1
    },
    'Royal Mail Signed For 2nd Class' : {
        signed: true,
        class: 2
    }
}

var RoyalMail = {
    api: {
        url: 'http://royalmail-api.hook.im/v1/prices'
    }
}

var weightPrecision = 3;

module.exports = {
    PostalItemTypes: PostalItemTypes,
    PostalServiceTypes: PostalServiceTypes,
    RoyalMail: RoyalMail,
    weightPrecision: weightPrecision
};