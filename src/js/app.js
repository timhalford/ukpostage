/// include lib dependencies
var ko = require('knockout');
var $ = require('jquery');

// include src files
var constants = require('./constants');
var util = require('./util');

function PostalItemViewModel(params) {
    var self = this;

    self.name = params.name;
    self.id = params.id;
    // initialize weight to half max weight specified
    self.weight = ko.observable(params.maxWeight / 2);
    // set max weight to specified
    self.maxWeight = params.maxWeight.toFixed(
        constants.weightPrecision
    );

    // returns weight formatted to 3 decimal places
    self.formattedWeight = ko.computed(function () {
        return parseFloat(self.weight()).toFixed(
            constants.weightPrecision
        );
    },
    self);
}

function PostalServiceViewModel(params) {
    // remove 'Royal Mail' substring from service name
    this.name = params.service.replace(
        'Royal Mail',
        ''
    );
    this.price = params.price;
    // retrieve service details
    this.signed = constants.PostalServiceTypes[
        params.service
    ].signed;
    this.cls = constants.PostalServiceTypes[
        params.service
    ].class;

}

function PostageViewModel() {
    var self = this;

    self.updatePostalServices = function () {
        // set started updating services
        self.updating(true);
        // send ajax request to Royal Mail price API
        $.ajax({
            url: constants.RoyalMail.api.url,
            crossDomain: true,
            data: {
                // postal item type id
                item: self.postalItem().id,
                // postal item weight
                weight: self.postalItem().weight()
            },
            success: function (serializedData) {
                // deserialize json
                data = $.parseJSON(serializedData);
                // remove any existing services
                self.postalServices.removeAll();
                // add recognised services in response
                for (var i=0; i< data.length; i++) {
                    if (
                        data[i].service in constants.PostalServiceTypes
                    ) {
                        self.postalServices.push(
                            new PostalServiceViewModel(data[i])
                        );
                    }
                }
                self.postalServices.sort(util.servicePriceSort);
                // set finished updating
                self.updating(false);
            }
        });
    }

    // sets the current postal item type to that specified in itemParams,
    // if it is not already
    self.setPostalItem = function (itemParams) {
        // if item is not current, or not item set
        if (
            !self.postalItem() ||
            itemParams.id != self.postalItem().id
        ) {
            // set postal item to that specified in itemParams
            self.postalItem(new PostalItemViewModel(itemParams));
            // update services
            self.updatePostalServices();
        }
    }

    self.postalItemTypes = constants.PostalItemTypes;
    self.postalItem = ko.observable();
    self.postalServices = ko.observableArray([]);
    // true when services are updating, false otherwise
    self.updating = ko.observable(false);

    // initalize postal item type to letter
    self.setPostalItem(constants.PostalItemTypes[0]);
}

// on document ready
$(document).ready(function () {
    // apply bindings
    ko.applyBindings(new PostageViewModel());
});