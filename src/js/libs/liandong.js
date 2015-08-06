;(function($){
    $.extend({jAddr:function(options){
        var opts = $.extend({}, $.jAddr.defaults, options);
        var prov = opts['data'];

        $('#'+opts['provid']).empty();
        !opts['noTip'] && $('#'+opts['provid']).append('<option>'+opts['provTip']+'</option>');
        for(i=0;i<prov.length;i++){
            var option = $('<option value="'+prov[i].name+'">'+prov[i].name+'</option>');
            $('#'+opts['provid']).append(option);
        }

        function updateCity(provIndex){
            provIndex < 0 && (provIndex = 0);
            var city = opts['data'][provIndex]['city'];
            $('#'+opts['cityid']).empty();
            !opts['noTip'] && $('#'+opts['cityid']).append('<option>'+opts['cityTip']+'</option>');
            for(i=0;i<city.length;i++){
                var option = $('<option value="'+city[i].name+'">'+city[i].name+'</option>');
                $('#'+opts['cityid']).append(option);
            }
        }
        updateCity(opts['noTip'] ? opts['provStart'] : opts['provStart'] - 1);

        function updateCounty(provIndex,cityIndex){
            provIndex < 0 && (provIndex = 0);
            cityIndex < 0 && (cityIndex = 0);
            var county = opts['data'][provIndex]['city'][cityIndex]['county'];
            $('#'+opts['countyid']).empty();
            !opts['noTip'] && $('#'+opts['countyid']).append('<option>'+opts['countyTip']+'</option>');
            for(i=0;i<county.length;i++){
                var option = $('<option value="'+county[i]+'">'+county[i]+'</option>');
                $('#'+opts['countyid']).append(option);
            }
        }
        updateCounty(opts['noTip']?opts['provStart']:opts['provStart']-1,opts['noTip']?opts['cityStart']:opts['cityStart']-1);

        $('#'+opts['provid']).get(0).options[opts['provStart']].setAttribute('selected',true);
        $('#'+opts['cityid']).get(0).options[opts['cityStart']].setAttribute('selected',true);
        $('#'+opts['countyid']).get(0).options[opts['countyStart']].setAttribute('selected',true);

        $('#'+opts['provid']).change(function(){
            var provIndex = $(this).get(0).selectedIndex;
            !opts['noTip'] && provIndex --;
            updateCity(provIndex);
            updateCounty(provIndex,0);
        });

        $('#'+opts['cityid']).change(function(){
            var provIndex = $('#'+opts['provid']).get(0).selectedIndex;
            var cityIndex = $(this).get(0).selectedIndex;
            !opts['noTip'] && provIndex --;
            !opts['noTip'] && cityIndex --;
            updateCounty(provIndex,cityIndex);
        });
    }});

    $.jAddr.defaults = {
        'provid':   'province',
        'cityid':   'city',
        'countyid': 'county',
        'noTip':    false,
        'provTip':  '- Province -',
        'cityTip':  '- City -',
        'countyTip':'- County -',
        'provStart':0,
        'cityStart':0,
        'countyStart':0,
        'data':     window.jAddrData
    };

})(jQuery);
