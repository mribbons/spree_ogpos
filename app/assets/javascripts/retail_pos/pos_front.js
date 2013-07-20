console.log("hi from pos_front");

$(document).ready(function() {
    console.log("pos_front ready!");
});


$(function () {
    $.namespace("org.omnigate");

    org.omnigate.retail_pos = retail_pos;
    function retail_pos(pos_selector, api_key)
    {
        this.txtInput = null;

        function init(pos_selector, api_key)
        {
            this.api_key = api_key;
            this.dom = $(pos_selector);

            if (this.dom.length == 0) throw "pos_selector failed: " + pos_selector;

            //var children = this.dom.children();
            var buttons = this.dom.find('div.pos_keypad_num');
            buttons.click($.proxy(this.numpad_click, this));

            var products = this.dom.find('div.pos_product_tile').find('div.content');
            products.on('click', $.proxy(this.product_click, this));

            this.txtTotal = this.dom.find('#pos_total');
            this.txtInput = this.dom.find('#pos_input');
            this.order_detail = this.dom.find('#pos_order_details');

            $.ajax({
                type: "GET",
                //dataType: "jsonp",
                url: "/api/variants",
                success: $.proxy(this.load_variants, this)
            });

            //this.create_order_req();

            // TODO debugging, user should init new order
            //this.order_number = "R667135804";

            this.total = 0;
            this.lines = [];

            //this.update_total_req();

            if (!this.api_key) alert("Spree API not connected.");
        }

        this.init=init;

        this.numpad_click=numpad_click;
        function numpad_click(e)
        {
            var c = $(e.target).attr("data-key");
            console.log("numpad_click: " + c);

            this.txtInput.val(this.txtInput.val() + c);
        }

        this.product_click=product_click;
        function product_click(e)
        {
            var product_id = $(e.target).attr("data-product-id");
            console.log("product click: " + product_id);

            // MDR 16/07/2013 - TODO - Should be passing variant id + should be clicking variants
            this.add_line_req(product_id);

            /*$.ajax({
             type: "GET",
             //dataType: "jsonp",
             url: "/api/option_types",
             success: function(data){
             //debugger;
             //alert(data);
             }
             });*/
        }

        this.load_variants=load_variants;
        function load_variants(data)
        {
            //debugger;
        }

        this.create_order_req=create_order_req;
        function create_order_req(cb)
        {
            //debugger;

            $.ajax({
                type: "POST",
                url: "/api/orders",
                data: { "token": this.api_key },
                success: $.proxy(this.create_order, this, cb || {})
            });
        }

        this.create_order=create_order;
        function create_order(cb, data)
        {
            this.order = data;
            this.order_number = data.number;
            //debugger;
            this.update_total_done(data);

            //debugger;

            if (cb.callback)
            {
                cb.callback.apply(cb.scope, cb.arguments);
            }
        }

        this.add_line_req=add_line_req;
        function add_line_req(variant_id, data)
        {
            if (!this.order)
            {
                // MDR 16/07/2013 - Create order first
                this.create_order_req({callback: this.add_line_req, scope: this, args: arguments });
                return;
            }

            $.ajax({
                type: "POST",
                //dataType: "jsonp",
                //url: "/api/products/" + product_id,
                url: "/api/orders/" + this.order_number + "/line_items?token=" + this.api_key,
                data: { "token": this.api_key, "line_item[variant_id]": "1", "line_item[quantity]" : "2" },
                success: $.proxy(this.add_line, this),
                failure: function(data) {
                    //debugger;
                }
            });
        }

        this.add_line=add_line;
        function add_line(product_data)
        {
            // { id, price, variant { id, images: [attatchment_url], name, sku }}
            //{"id":31,"quantity":1,"price":"15.99","variant_id":1,"variant":{"id":1,"name":"Ruby on Rails Tote","sku":"ROR-00011","price":"15.99","weight":null,"height":null,"width":null,"depth":null,"is_master":true,"cost_price":"17.0","permalink":"ruby-on-rails-tote","product_id":1,"images":[{"id":21,"position":1,"attachment_content_type":"image/jpeg","attachment_file_name":"ror_tote.jpeg","type":"Spree::Image","attachment_updated_at":"2013-07-13T02:46:45Z","attachment_width":360,"attachment_height":360,"alt":null,"viewable_type":"Spree::Variant","viewable_id":1,"attachment_url":"/spree/products/21/product/ror_tote.jpeg?1373683605"},{"id":22,"position":2,"attachment_content_type":"image/jpeg","attachment_file_name":"ror_tote_back.jpeg","type":"Spree::Image","attachment_updated_at":"2013-07-13T02:46:45Z","attachment_width":360,"attachment_height":360,"alt":null,"viewable_type":"Spree::Variant","viewable_id":1,"attachment_url":"/spree/products/22/product/ror_tote_back.jpeg?1373683605"}]}}
            var line_price = parseFloat(product_data.variant.price) * parseFloat(product_data.quantity);
            this.order_detail.append('<div class="order_line">' + product_data.variant.name + ' x ' + product_data.quantity + '<br/>' + product_data.variant.sku + "&nbsp;&nbsp;&nbsp;&nbsp;$" + line_price + '</div> ');
            //debugger;
            //this.update_total_req();
            this.add_total(line_price);
        }

        this.update_total_req=update_total_req;
        function update_total_req()
        {
            $.ajax({
                type: "GET",
                url: "/api/orders/" + this.order_number + "?token=" + this.api_key,
                success: $.proxy(this.update_total_done, this)
            })
        }

        this.update_total_done=update_total_done;
        function update_total_done(data)
        {
            this.total = parseFloat(data.item_total);
            this.txtTotal.val('$' + data.item_total);
        }

        this.add_total=add_total;
        function add_total(price)
        {
            this.total += parseFloat(price);
            this.txtTotal.val('$' + this.total);
        }

        this.init(pos_selector, api_key);
    }
});