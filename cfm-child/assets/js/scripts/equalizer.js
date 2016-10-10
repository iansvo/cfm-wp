
 
// Custom Event Polyfill for IE
// see: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
(function () {
 
  if ( typeof window.CustomEvent === "function" ) return false;
 
    function CustomEvent ( event, params ) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent( 'CustomEvent' );
        evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
        return evt;
    }
 
    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;

})();
 
// Optimized Resize Event Listener with full browser support (IE 9+, Safari, Chrome, Firefox)
;(function() {
  var throttle = function(type, name, obj) {
    obj = obj || window;
    var running = false;
    var func = function() {
      if (running) { return; }
      running = true;
      requestAnimationFrame(function() {
          if ( typeof window.CustomEvent === "function" )
          {
            obj.dispatchEvent(new CustomEvent(name));
            running = false;
          }
      });
    };
    obj.addEventListener(type, func);
  };
 
  /* init - you can init any event */
  throttle("resize", "optimizedResize");
})();
 
// Optimized Scroll Event Listener with full browser support (IE 9+, Safari, Chrome, Firefox)
;(function() {
  var throttle = function(type, name, object) {
    var obj = object || window;
    var running = false;
    var func = function() {
        if (running) { return; }
        running = true;
        requestAnimationFrame(function() {
            if ( typeof window.CustomEvent === "function" )
            {
              obj.dispatchEvent(new CustomEvent(name));
              running = false;
            }
        });
    };
    obj.addEventListener(type, func);
  };
 
  /* init - you can init any event */
  throttle ("scroll", "optimizedScroll");
})();


function equalizeHeight(breakpoints)
{
	$ = jQuery;
  var mediaQueries = {};
  var bpWidths = [];

  for(var breakpoint in breakpoints)
  {
    bpWidths.push( breakpoints[breakpoint] );
  }

  if( $('[data-equalize-row]').length > 0 )
  {

    $('[data-equalize-row]').each(function()
    {

      var maxHeight = 0;

      $(this).find('[data-equalize]').each(function() 
      {

        var runMethod = {
          all: true
        };

        for(var breakpoint in breakpoints)
        {
          runMethod[breakpoint] = false;
        }
              
         
        $(this).height('auto');

        var eleHeight = $(this).outerHeight();
        var rules     = $(this).attr('data-equalize');

        if( rules !== '' )
        {

          var ruleArray = rules.split(',');

          for (var i = 0; i < ruleArray.length; i++) 
          {
            runMethod[ruleArray[i]] = true;
          }

          runMethod.all = false;
        }
        else
        {
          runMethod.all = true;
        }

        if( eleHeight > maxHeight )
        {
          maxHeight = eleHeight;
        }

        // Starts Index
        var index = 0;
        for ( var method in runMethod ) 
        {

          var $this   = runMethod;

          if( $this[method] === true )
          {
            $(this).addClass('equalizer-item equalizer-' + method);
          }
          else
          {
            $(this).removeClass('equalizer-' + method);
          }

          index++; // increment index
        }


      });


      var bpIndex = 0;

      for(var breakpoint in breakpoints)
      {
        var name     = breakpoint,
            bpClass  = '.equalizer-' + name, 
            minWidth = breakpoints[breakpoint] + 'px',
            maxWidth = ( bpWidths[bpIndex + 1] - 1 ) + 'px',
            mq       = '';

        if( ( bpWidths.length - 1 ) !== bpIndex )
        {
          mq   = window.matchMedia('(min-width: ' + minWidth + ') and (max-width: '+ maxWidth +')');
        }
        else
        {
          mq   = window.matchMedia('(min-width: ' + minWidth + ')');   
        }


        if( mq.matches )
        {
          var $bpElement = $(this).find( bpClass );

          $(this).find('.equalizer-item').height('auto');

          if( $bpElement.length )
          {
            $bpElement.outerHeight( maxHeight );
          }
          else
          {
            $(this).find('.equalizer-all').outerHeight( maxHeight );
          }


          // console.log('breakpoint class' + bpClass);

          break;
        }

        bpIndex++;
      }

      // console.log('equalizeHeight ran');
    }); 
  }
}



var breakpoints = {
  all: 0,
  mobile: 480,
  medium: 768,
  large: 1024,
  xlarge: 1200,
  xxlarge: 1440
};


(function($) {
  $(window).load(function() {
    equalizeHeight(breakpoints);
  });
  window.addEventListener('optimizedResize', function() {
    equalizeHeight(breakpoints);
  });
})(jQuery);