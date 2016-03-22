(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

/**
 * Step 1 - Making our own module
 * Dependencies in this Demo
 *  PointyPony : The angular module from Advans. It contains elements that we can reuse.
 * Read the docs to learn more. http://advans.herokuapp.com/#/docs
 *  ui.router  : The angular modole to help navigate from page to page. 
 * learn more on http://angular-ui.github.io/ui-router/site/#/api/ui.router
 *  ngMaterial : An Angular based framework for rendering material styled elements
 * read more on  https://material.angularjs.org/latest/
 *  ngMdIcons : An Angular based framework for showing icons
*/
var app = angular.module('AdvansDefault', ["PointyPony", "ngMdIcons", "ui.router",  "ngMaterial"]);


/**
 * Step 2 - Referencing our online course
 * You can find your course token on advans.herokuapp.com
 */
app.constant('appConfig', {
	//Replace this token with your token from the course
	courseToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IldlYnMxIg.uGpO7JypD9I6gKr-n6pW_J8loElFd0Elt2MY-8niG0o",
});

//Make your own elements, in our case a routing config and a app controller
var routesConfig = require('./config/routes');
var appCtrl = require("./controllers/appCtrl");
var livePreview = require('./directives/livePreview.js');

//Add the controller and config to the module
app.controller('appCtrl', appCtrl);
app.config(routesConfig);
app.directive('livepreview', livePreview);


app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('light-blue')
    .accentPalette('deep-orange');
});



},{"./config/routes":2,"./controllers/appCtrl":3,"./directives/livePreview.js":4}],2:[function(require,module,exports){
module.exports = function($stateProvider, $urlRouterProvider) {
    
    //Default route
    $urlRouterProvider.otherwise('home');
    
    //Register all the routes
    $stateProvider
        
        //Default pages
        .state('home', { url: '/home',  templateUrl:'default/home.html' })
        .state('leaderboards', { url: '/leaderboards',  templateUrl:'default/leaderboards.html' })
        .state('profile', { url: '/profile',  templateUrl:'default/profile.html' })
        
        //Content
        .state('inleidinga', { url: '/inleiding/www', templateUrl:'inleiding/www.html' } )
        .state('inleidingb', { url: '/inleiding/geschiedenis', templateUrl:'inleiding/geschiedenis.html' } )
        .state('inleidingc', { url: '/inleiding/ontwerp', templateUrl:'inleiding/ontwerp.html' } )
        
        .state('week1a', { url: '/week1/basistructuur', templateUrl:'week1/structuur.html' } )
        .state('week1b', { url: '/week1/geschiedenis', templateUrl:'week1/tags.html' } )
        .state('week1c', { url: '/week1/Tekstindeling', templateUrl:'week1/tekst.html' } )
        .state('week1d', { url: '/week1/Lijsten', templateUrl:'week1/lijsten.html' } )
        .state('week1e', { url: '/week1/Hyperlinks', templateUrl:'week1/links.html' } )
        .state('week1f', { url: '/week1/Entiteiten', templateUrl:'week1/entiteiten.html' } )
        
        .state('week2a', { url: '/week2/afbeeldingen', templateUrl:'week2/afbeeldingen.html' } )
        .state('week2b', { url: '/week2/formulieren', templateUrl:'week2/formulieren.html' } )
        .state('week2c', { url: '/week2/tabellen', templateUrl:'week2/tabellen.html' } )
        
        .state('week3a', { url: '/week3/intro', templateUrl:'week3/intro.html' } )
        .state('week3b', { url: '/week3/selectors', templateUrl:'week3/selectors.html' } )
        .state('week3c', { url: '/week3/tekstopmaak', templateUrl:'week3/tekstopmaak.html' } )
        .state('week3d', { url: '/week3/boxmodel', templateUrl:'week3/boxmodel.html' } )
        .state('week3e', { url: '/week3/units', templateUrl:'week3/units.html' } )
        .state('week3f', { url: '/week3/float', templateUrl:'week3/float.html' } )
        
};
},{}],3:[function(require,module,exports){
module.exports = function ($scope, $timeout, $mdSidenav, $log, $rootScope) {
    

    $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
        $mdSidenav('left').close();
    });
    
    $scope.toggleLeft = function(){
         $mdSidenav('left').toggle();
    }
    
    $scope.closeLeft = function(){
          $mdSidenav('left').close();
    }
   
    
};
},{}],4:[function(require,module,exports){
module.exports = function ($compile) {
  return {
    restrict: 'C',
    replace: true,
    link: function (scope, element, attrs) {
      livepreview(element[0]);
    }
  };
}

function livepreview(code_element) {
    function dirname(path) {
        return path.substring(0, path.lastIndexOf('/'));
    }

    code = $(code_element);
    var css_span = code.find('.css');
    var has_css = css_span.length > 0;
    var inputs = $();

    if(has_css) {
        css_span.html(css_span.html().trim().replace(/&nbsp;$/, ''));
        inputs = css_span.find('select,input');
        inputs.each(function(i, el) {
            $(el).parent().css('position', 'relative');
            $(el).css('top', $(el).position().top + 8);
            var placeholder = $('<span class="placeholder"></span>');
            placeholder.data('input', el);
            $(el).replaceWith(placeholder);
        }).data('template', css_span);
        var css_height = css_span.outerHeight();
        css_span.detach();
    }
    code.html(code.html().trim().replace(/&nbsp;$/, ''));

    var editors = $('<div class="editors"></div>');
    code.after(editors);

    var get_editor = function(element) {
        var editor = ace.edit(element);
        editor.setTheme("ace/theme/chrome");
        editor.setHighlightActiveLine(false);
        editor.setShowFoldWidgets(false);
        editor.setShowPrintMargin(false);
        editor.session.setUseWrapMode(true);
        editor.renderer.setShowGutter(false);
        editor.renderer.setScrollMargin(8, 8, 0, 0);
        editor.renderer.setPadding(10);
        return editor;
    };

    //Make a copy of the code element as an editor
    if(has_css) {
        var css_editor = $('<code class="editor css"></code>')
            .css('height', css_height + 8 + 8 + 1 + 5)
            .html(css_span.html());

        editors.append(css_editor);
        ace_css_editor = get_editor(css_editor[0]);
        ace_css_editor.getSession().setMode("ace/mode/css");
        inputs.data('editor', ace_css_editor);
    } else {
        ace_css_editor = undefined;
    }

    var html_editor = $('<code class="editor html"></code>')
        .css('height', code.outerHeight())
        .html(code.html());
    editors.append(html_editor);

    ace_html_editor = get_editor(html_editor[0]);
    ace_html_editor.getSession().setMode("ace/mode/html");

    // Create a live preview of the textarea
    var preview = $('<iframe class="live_preview"></iframe>');
    editors.append(preview);

    var height = html_editor.outerHeight() - 2;
    if(has_css)
        height += css_editor.outerHeight();
    preview.height(height);

    function update_function(ace_html_editor, ace_css_editor, preview) {
        return function() {
            var base = dirname(window.location.hash.substring(2));
            var head = '<base target="_top" href="http://'+window.location.host+window.location.pathname+base+'/">';

            if(has_css)
                head += '<style>' + ace_css_editor.getSession().getValue() + '</style>';

            var body = ace_html_editor.session.getValue();

            preview.contents().find('head').html(head);
            preview.contents().find('body').html(body);
            preview.contents().find('a').click(function() {return this.doclick;});
        }
    };
    var update = update_function(ace_html_editor, ace_css_editor, preview);
    ace_html_editor.on('change', update);
    if(has_css)
        ace_css_editor.on('change', update);

    update();
    window.setTimeout(update, 1000);


    // Add event handlers to the inputs
    function input_change() {
        var editor = $(this).data('editor');
        var template = $(this).data('template');
        template = template.clone(true);
        template.find('.placeholder').each(function(i, el) {
            $(this).replaceWith($($(this).data('input')).val());
        });

        editor.session.setValue(template.text());
    }
    inputs.on('input', input_change).on('change', input_change);
    if(inputs.length > 0) {
        input_change.call(inputs[0]);
        window.setTimeout(function() {
            input_change.call(inputs[0]);
        }, 1000);
    }

    // Remove original element
    code.detach();

    if(has_css) {
        css_editor.append(inputs);
    }
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvYXBwLmpzIiwiYXBwL2NvbmZpZy9yb3V0ZXMuanMiLCJhcHAvY29udHJvbGxlcnMvYXBwQ3RybC5qcyIsImFwcC9kaXJlY3RpdmVzL2xpdmVQcmV2aWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcclxuLyoqXHJcbiAqIFN0ZXAgMSAtIE1ha2luZyBvdXIgb3duIG1vZHVsZVxyXG4gKiBEZXBlbmRlbmNpZXMgaW4gdGhpcyBEZW1vXHJcbiAqICBQb2ludHlQb255IDogVGhlIGFuZ3VsYXIgbW9kdWxlIGZyb20gQWR2YW5zLiBJdCBjb250YWlucyBlbGVtZW50cyB0aGF0IHdlIGNhbiByZXVzZS5cclxuICogUmVhZCB0aGUgZG9jcyB0byBsZWFybiBtb3JlLiBodHRwOi8vYWR2YW5zLmhlcm9rdWFwcC5jb20vIy9kb2NzXHJcbiAqICB1aS5yb3V0ZXIgIDogVGhlIGFuZ3VsYXIgbW9kb2xlIHRvIGhlbHAgbmF2aWdhdGUgZnJvbSBwYWdlIHRvIHBhZ2UuIFxyXG4gKiBsZWFybiBtb3JlIG9uIGh0dHA6Ly9hbmd1bGFyLXVpLmdpdGh1Yi5pby91aS1yb3V0ZXIvc2l0ZS8jL2FwaS91aS5yb3V0ZXJcclxuICogIG5nTWF0ZXJpYWwgOiBBbiBBbmd1bGFyIGJhc2VkIGZyYW1ld29yayBmb3IgcmVuZGVyaW5nIG1hdGVyaWFsIHN0eWxlZCBlbGVtZW50c1xyXG4gKiByZWFkIG1vcmUgb24gIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhcmpzLm9yZy9sYXRlc3QvXHJcbiAqICBuZ01kSWNvbnMgOiBBbiBBbmd1bGFyIGJhc2VkIGZyYW1ld29yayBmb3Igc2hvd2luZyBpY29uc1xyXG4qL1xyXG52YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ0FkdmFuc0RlZmF1bHQnLCBbXCJQb2ludHlQb255XCIsIFwibmdNZEljb25zXCIsIFwidWkucm91dGVyXCIsICBcIm5nTWF0ZXJpYWxcIl0pO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBTdGVwIDIgLSBSZWZlcmVuY2luZyBvdXIgb25saW5lIGNvdXJzZVxyXG4gKiBZb3UgY2FuIGZpbmQgeW91ciBjb3Vyc2UgdG9rZW4gb24gYWR2YW5zLmhlcm9rdWFwcC5jb21cclxuICovXHJcbmFwcC5jb25zdGFudCgnYXBwQ29uZmlnJywge1xyXG5cdC8vUmVwbGFjZSB0aGlzIHRva2VuIHdpdGggeW91ciB0b2tlbiBmcm9tIHRoZSBjb3Vyc2VcclxuXHRjb3Vyc2VUb2tlbjogXCJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuSWxkbFluTXhJZy51R3BPN0p5cEQ5STZnS3ItbjZwV19KOGxvRWxGZDBFbHQyTVktOG5pRzBvXCIsXHJcbn0pO1xyXG5cclxuLy9NYWtlIHlvdXIgb3duIGVsZW1lbnRzLCBpbiBvdXIgY2FzZSBhIHJvdXRpbmcgY29uZmlnIGFuZCBhIGFwcCBjb250cm9sbGVyXHJcbnZhciByb3V0ZXNDb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZy9yb3V0ZXMnKTtcclxudmFyIGFwcEN0cmwgPSByZXF1aXJlKFwiLi9jb250cm9sbGVycy9hcHBDdHJsXCIpO1xyXG52YXIgbGl2ZVByZXZpZXcgPSByZXF1aXJlKCcuL2RpcmVjdGl2ZXMvbGl2ZVByZXZpZXcuanMnKTtcclxuXHJcbi8vQWRkIHRoZSBjb250cm9sbGVyIGFuZCBjb25maWcgdG8gdGhlIG1vZHVsZVxyXG5hcHAuY29udHJvbGxlcignYXBwQ3RybCcsIGFwcEN0cmwpO1xyXG5hcHAuY29uZmlnKHJvdXRlc0NvbmZpZyk7XHJcbmFwcC5kaXJlY3RpdmUoJ2xpdmVwcmV2aWV3JywgbGl2ZVByZXZpZXcpO1xyXG5cclxuXHJcbmFwcC5jb25maWcoZnVuY3Rpb24oJG1kVGhlbWluZ1Byb3ZpZGVyKSB7XHJcbiAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkZWZhdWx0JylcclxuICAgIC5wcmltYXJ5UGFsZXR0ZSgnbGlnaHQtYmx1ZScpXHJcbiAgICAuYWNjZW50UGFsZXR0ZSgnZGVlcC1vcmFuZ2UnKTtcclxufSk7XHJcblxyXG5cclxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XHJcbiAgICBcclxuICAgIC8vRGVmYXVsdCByb3V0ZVxyXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnaG9tZScpO1xyXG4gICAgXHJcbiAgICAvL1JlZ2lzdGVyIGFsbCB0aGUgcm91dGVzXHJcbiAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vRGVmYXVsdCBwYWdlc1xyXG4gICAgICAgIC5zdGF0ZSgnaG9tZScsIHsgdXJsOiAnL2hvbWUnLCAgdGVtcGxhdGVVcmw6J2RlZmF1bHQvaG9tZS5odG1sJyB9KVxyXG4gICAgICAgIC5zdGF0ZSgnbGVhZGVyYm9hcmRzJywgeyB1cmw6ICcvbGVhZGVyYm9hcmRzJywgIHRlbXBsYXRlVXJsOidkZWZhdWx0L2xlYWRlcmJvYXJkcy5odG1sJyB9KVxyXG4gICAgICAgIC5zdGF0ZSgncHJvZmlsZScsIHsgdXJsOiAnL3Byb2ZpbGUnLCAgdGVtcGxhdGVVcmw6J2RlZmF1bHQvcHJvZmlsZS5odG1sJyB9KVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vQ29udGVudFxyXG4gICAgICAgIC5zdGF0ZSgnaW5sZWlkaW5nYScsIHsgdXJsOiAnL2lubGVpZGluZy93d3cnLCB0ZW1wbGF0ZVVybDonaW5sZWlkaW5nL3d3dy5odG1sJyB9IClcclxuICAgICAgICAuc3RhdGUoJ2lubGVpZGluZ2InLCB7IHVybDogJy9pbmxlaWRpbmcvZ2VzY2hpZWRlbmlzJywgdGVtcGxhdGVVcmw6J2lubGVpZGluZy9nZXNjaGllZGVuaXMuaHRtbCcgfSApXHJcbiAgICAgICAgLnN0YXRlKCdpbmxlaWRpbmdjJywgeyB1cmw6ICcvaW5sZWlkaW5nL29udHdlcnAnLCB0ZW1wbGF0ZVVybDonaW5sZWlkaW5nL29udHdlcnAuaHRtbCcgfSApXHJcbiAgICAgICAgXHJcbiAgICAgICAgLnN0YXRlKCd3ZWVrMWEnLCB7IHVybDogJy93ZWVrMS9iYXNpc3RydWN0dXVyJywgdGVtcGxhdGVVcmw6J3dlZWsxL3N0cnVjdHV1ci5odG1sJyB9IClcclxuICAgICAgICAuc3RhdGUoJ3dlZWsxYicsIHsgdXJsOiAnL3dlZWsxL2dlc2NoaWVkZW5pcycsIHRlbXBsYXRlVXJsOid3ZWVrMS90YWdzLmh0bWwnIH0gKVxyXG4gICAgICAgIC5zdGF0ZSgnd2VlazFjJywgeyB1cmw6ICcvd2VlazEvVGVrc3RpbmRlbGluZycsIHRlbXBsYXRlVXJsOid3ZWVrMS90ZWtzdC5odG1sJyB9IClcclxuICAgICAgICAuc3RhdGUoJ3dlZWsxZCcsIHsgdXJsOiAnL3dlZWsxL0xpanN0ZW4nLCB0ZW1wbGF0ZVVybDond2VlazEvbGlqc3Rlbi5odG1sJyB9IClcclxuICAgICAgICAuc3RhdGUoJ3dlZWsxZScsIHsgdXJsOiAnL3dlZWsxL0h5cGVybGlua3MnLCB0ZW1wbGF0ZVVybDond2VlazEvbGlua3MuaHRtbCcgfSApXHJcbiAgICAgICAgLnN0YXRlKCd3ZWVrMWYnLCB7IHVybDogJy93ZWVrMS9FbnRpdGVpdGVuJywgdGVtcGxhdGVVcmw6J3dlZWsxL2VudGl0ZWl0ZW4uaHRtbCcgfSApXHJcbiAgICAgICAgXHJcbiAgICAgICAgLnN0YXRlKCd3ZWVrMmEnLCB7IHVybDogJy93ZWVrMi9hZmJlZWxkaW5nZW4nLCB0ZW1wbGF0ZVVybDond2VlazIvYWZiZWVsZGluZ2VuLmh0bWwnIH0gKVxyXG4gICAgICAgIC5zdGF0ZSgnd2VlazJiJywgeyB1cmw6ICcvd2VlazIvZm9ybXVsaWVyZW4nLCB0ZW1wbGF0ZVVybDond2VlazIvZm9ybXVsaWVyZW4uaHRtbCcgfSApXHJcbiAgICAgICAgLnN0YXRlKCd3ZWVrMmMnLCB7IHVybDogJy93ZWVrMi90YWJlbGxlbicsIHRlbXBsYXRlVXJsOid3ZWVrMi90YWJlbGxlbi5odG1sJyB9IClcclxuICAgICAgICBcclxuICAgICAgICAuc3RhdGUoJ3dlZWszYScsIHsgdXJsOiAnL3dlZWszL2ludHJvJywgdGVtcGxhdGVVcmw6J3dlZWszL2ludHJvLmh0bWwnIH0gKVxyXG4gICAgICAgIC5zdGF0ZSgnd2VlazNiJywgeyB1cmw6ICcvd2VlazMvc2VsZWN0b3JzJywgdGVtcGxhdGVVcmw6J3dlZWszL3NlbGVjdG9ycy5odG1sJyB9IClcclxuICAgICAgICAuc3RhdGUoJ3dlZWszYycsIHsgdXJsOiAnL3dlZWszL3Rla3N0b3BtYWFrJywgdGVtcGxhdGVVcmw6J3dlZWszL3Rla3N0b3BtYWFrLmh0bWwnIH0gKVxyXG4gICAgICAgIC5zdGF0ZSgnd2VlazNkJywgeyB1cmw6ICcvd2VlazMvYm94bW9kZWwnLCB0ZW1wbGF0ZVVybDond2VlazMvYm94bW9kZWwuaHRtbCcgfSApXHJcbiAgICAgICAgLnN0YXRlKCd3ZWVrM2UnLCB7IHVybDogJy93ZWVrMy91bml0cycsIHRlbXBsYXRlVXJsOid3ZWVrMy91bml0cy5odG1sJyB9IClcclxuICAgICAgICAuc3RhdGUoJ3dlZWszZicsIHsgdXJsOiAnL3dlZWszL2Zsb2F0JywgdGVtcGxhdGVVcmw6J3dlZWszL2Zsb2F0Lmh0bWwnIH0gKVxyXG4gICAgICAgIFxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCRzY29wZSwgJHRpbWVvdXQsICRtZFNpZGVuYXYsICRsb2csICRyb290U2NvcGUpIHtcclxuICAgIFxyXG5cclxuICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdGFydCcsIGZ1bmN0aW9uKGUsIHRvU3RhdGUsIHRvUGFyYW1zLCBmcm9tU3RhdGUsIGZyb21QYXJhbXMpIHtcclxuICAgICAgICAkbWRTaWRlbmF2KCdsZWZ0JykuY2xvc2UoKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAkc2NvcGUudG9nZ2xlTGVmdCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICRtZFNpZGVuYXYoJ2xlZnQnKS50b2dnbGUoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgJHNjb3BlLmNsb3NlTGVmdCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAkbWRTaWRlbmF2KCdsZWZ0JykuY2xvc2UoKTtcclxuICAgIH1cclxuICAgXHJcbiAgICBcclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgkY29tcGlsZSkge1xyXG4gIHJldHVybiB7XHJcbiAgICByZXN0cmljdDogJ0MnLFxyXG4gICAgcmVwbGFjZTogdHJ1ZSxcclxuICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcclxuICAgICAgbGl2ZXByZXZpZXcoZWxlbWVudFswXSk7XHJcbiAgICB9XHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gbGl2ZXByZXZpZXcoY29kZV9lbGVtZW50KSB7XHJcbiAgICBmdW5jdGlvbiBkaXJuYW1lKHBhdGgpIHtcclxuICAgICAgICByZXR1cm4gcGF0aC5zdWJzdHJpbmcoMCwgcGF0aC5sYXN0SW5kZXhPZignLycpKTtcclxuICAgIH1cclxuXHJcbiAgICBjb2RlID0gJChjb2RlX2VsZW1lbnQpO1xyXG4gICAgdmFyIGNzc19zcGFuID0gY29kZS5maW5kKCcuY3NzJyk7XHJcbiAgICB2YXIgaGFzX2NzcyA9IGNzc19zcGFuLmxlbmd0aCA+IDA7XHJcbiAgICB2YXIgaW5wdXRzID0gJCgpO1xyXG5cclxuICAgIGlmKGhhc19jc3MpIHtcclxuICAgICAgICBjc3Nfc3Bhbi5odG1sKGNzc19zcGFuLmh0bWwoKS50cmltKCkucmVwbGFjZSgvJm5ic3A7JC8sICcnKSk7XHJcbiAgICAgICAgaW5wdXRzID0gY3NzX3NwYW4uZmluZCgnc2VsZWN0LGlucHV0Jyk7XHJcbiAgICAgICAgaW5wdXRzLmVhY2goZnVuY3Rpb24oaSwgZWwpIHtcclxuICAgICAgICAgICAgJChlbCkucGFyZW50KCkuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xyXG4gICAgICAgICAgICAkKGVsKS5jc3MoJ3RvcCcsICQoZWwpLnBvc2l0aW9uKCkudG9wICsgOCk7XHJcbiAgICAgICAgICAgIHZhciBwbGFjZWhvbGRlciA9ICQoJzxzcGFuIGNsYXNzPVwicGxhY2Vob2xkZXJcIj48L3NwYW4+Jyk7XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyLmRhdGEoJ2lucHV0JywgZWwpO1xyXG4gICAgICAgICAgICAkKGVsKS5yZXBsYWNlV2l0aChwbGFjZWhvbGRlcik7XHJcbiAgICAgICAgfSkuZGF0YSgndGVtcGxhdGUnLCBjc3Nfc3Bhbik7XHJcbiAgICAgICAgdmFyIGNzc19oZWlnaHQgPSBjc3Nfc3Bhbi5vdXRlckhlaWdodCgpO1xyXG4gICAgICAgIGNzc19zcGFuLmRldGFjaCgpO1xyXG4gICAgfVxyXG4gICAgY29kZS5odG1sKGNvZGUuaHRtbCgpLnRyaW0oKS5yZXBsYWNlKC8mbmJzcDskLywgJycpKTtcclxuXHJcbiAgICB2YXIgZWRpdG9ycyA9ICQoJzxkaXYgY2xhc3M9XCJlZGl0b3JzXCI+PC9kaXY+Jyk7XHJcbiAgICBjb2RlLmFmdGVyKGVkaXRvcnMpO1xyXG5cclxuICAgIHZhciBnZXRfZWRpdG9yID0gZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICAgICAgIHZhciBlZGl0b3IgPSBhY2UuZWRpdChlbGVtZW50KTtcclxuICAgICAgICBlZGl0b3Iuc2V0VGhlbWUoXCJhY2UvdGhlbWUvY2hyb21lXCIpO1xyXG4gICAgICAgIGVkaXRvci5zZXRIaWdobGlnaHRBY3RpdmVMaW5lKGZhbHNlKTtcclxuICAgICAgICBlZGl0b3Iuc2V0U2hvd0ZvbGRXaWRnZXRzKGZhbHNlKTtcclxuICAgICAgICBlZGl0b3Iuc2V0U2hvd1ByaW50TWFyZ2luKGZhbHNlKTtcclxuICAgICAgICBlZGl0b3Iuc2Vzc2lvbi5zZXRVc2VXcmFwTW9kZSh0cnVlKTtcclxuICAgICAgICBlZGl0b3IucmVuZGVyZXIuc2V0U2hvd0d1dHRlcihmYWxzZSk7XHJcbiAgICAgICAgZWRpdG9yLnJlbmRlcmVyLnNldFNjcm9sbE1hcmdpbig4LCA4LCAwLCAwKTtcclxuICAgICAgICBlZGl0b3IucmVuZGVyZXIuc2V0UGFkZGluZygxMCk7XHJcbiAgICAgICAgcmV0dXJuIGVkaXRvcjtcclxuICAgIH07XHJcblxyXG4gICAgLy9NYWtlIGEgY29weSBvZiB0aGUgY29kZSBlbGVtZW50IGFzIGFuIGVkaXRvclxyXG4gICAgaWYoaGFzX2Nzcykge1xyXG4gICAgICAgIHZhciBjc3NfZWRpdG9yID0gJCgnPGNvZGUgY2xhc3M9XCJlZGl0b3IgY3NzXCI+PC9jb2RlPicpXHJcbiAgICAgICAgICAgIC5jc3MoJ2hlaWdodCcsIGNzc19oZWlnaHQgKyA4ICsgOCArIDEgKyA1KVxyXG4gICAgICAgICAgICAuaHRtbChjc3Nfc3Bhbi5odG1sKCkpO1xyXG5cclxuICAgICAgICBlZGl0b3JzLmFwcGVuZChjc3NfZWRpdG9yKTtcclxuICAgICAgICBhY2VfY3NzX2VkaXRvciA9IGdldF9lZGl0b3IoY3NzX2VkaXRvclswXSk7XHJcbiAgICAgICAgYWNlX2Nzc19lZGl0b3IuZ2V0U2Vzc2lvbigpLnNldE1vZGUoXCJhY2UvbW9kZS9jc3NcIik7XHJcbiAgICAgICAgaW5wdXRzLmRhdGEoJ2VkaXRvcicsIGFjZV9jc3NfZWRpdG9yKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWNlX2Nzc19lZGl0b3IgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGh0bWxfZWRpdG9yID0gJCgnPGNvZGUgY2xhc3M9XCJlZGl0b3IgaHRtbFwiPjwvY29kZT4nKVxyXG4gICAgICAgIC5jc3MoJ2hlaWdodCcsIGNvZGUub3V0ZXJIZWlnaHQoKSlcclxuICAgICAgICAuaHRtbChjb2RlLmh0bWwoKSk7XHJcbiAgICBlZGl0b3JzLmFwcGVuZChodG1sX2VkaXRvcik7XHJcblxyXG4gICAgYWNlX2h0bWxfZWRpdG9yID0gZ2V0X2VkaXRvcihodG1sX2VkaXRvclswXSk7XHJcbiAgICBhY2VfaHRtbF9lZGl0b3IuZ2V0U2Vzc2lvbigpLnNldE1vZGUoXCJhY2UvbW9kZS9odG1sXCIpO1xyXG5cclxuICAgIC8vIENyZWF0ZSBhIGxpdmUgcHJldmlldyBvZiB0aGUgdGV4dGFyZWFcclxuICAgIHZhciBwcmV2aWV3ID0gJCgnPGlmcmFtZSBjbGFzcz1cImxpdmVfcHJldmlld1wiPjwvaWZyYW1lPicpO1xyXG4gICAgZWRpdG9ycy5hcHBlbmQocHJldmlldyk7XHJcblxyXG4gICAgdmFyIGhlaWdodCA9IGh0bWxfZWRpdG9yLm91dGVySGVpZ2h0KCkgLSAyO1xyXG4gICAgaWYoaGFzX2NzcylcclxuICAgICAgICBoZWlnaHQgKz0gY3NzX2VkaXRvci5vdXRlckhlaWdodCgpO1xyXG4gICAgcHJldmlldy5oZWlnaHQoaGVpZ2h0KTtcclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVfZnVuY3Rpb24oYWNlX2h0bWxfZWRpdG9yLCBhY2VfY3NzX2VkaXRvciwgcHJldmlldykge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGJhc2UgPSBkaXJuYW1lKHdpbmRvdy5sb2NhdGlvbi5oYXNoLnN1YnN0cmluZygyKSk7XHJcbiAgICAgICAgICAgIHZhciBoZWFkID0gJzxiYXNlIHRhcmdldD1cIl90b3BcIiBocmVmPVwiaHR0cDovLycrd2luZG93LmxvY2F0aW9uLmhvc3Qrd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lK2Jhc2UrJy9cIj4nO1xyXG5cclxuICAgICAgICAgICAgaWYoaGFzX2NzcylcclxuICAgICAgICAgICAgICAgIGhlYWQgKz0gJzxzdHlsZT4nICsgYWNlX2Nzc19lZGl0b3IuZ2V0U2Vzc2lvbigpLmdldFZhbHVlKCkgKyAnPC9zdHlsZT4nO1xyXG5cclxuICAgICAgICAgICAgdmFyIGJvZHkgPSBhY2VfaHRtbF9lZGl0b3Iuc2Vzc2lvbi5nZXRWYWx1ZSgpO1xyXG5cclxuICAgICAgICAgICAgcHJldmlldy5jb250ZW50cygpLmZpbmQoJ2hlYWQnKS5odG1sKGhlYWQpO1xyXG4gICAgICAgICAgICBwcmV2aWV3LmNvbnRlbnRzKCkuZmluZCgnYm9keScpLmh0bWwoYm9keSk7XHJcbiAgICAgICAgICAgIHByZXZpZXcuY29udGVudHMoKS5maW5kKCdhJykuY2xpY2soZnVuY3Rpb24oKSB7cmV0dXJuIHRoaXMuZG9jbGljazt9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdmFyIHVwZGF0ZSA9IHVwZGF0ZV9mdW5jdGlvbihhY2VfaHRtbF9lZGl0b3IsIGFjZV9jc3NfZWRpdG9yLCBwcmV2aWV3KTtcclxuICAgIGFjZV9odG1sX2VkaXRvci5vbignY2hhbmdlJywgdXBkYXRlKTtcclxuICAgIGlmKGhhc19jc3MpXHJcbiAgICAgICAgYWNlX2Nzc19lZGl0b3Iub24oJ2NoYW5nZScsIHVwZGF0ZSk7XHJcblxyXG4gICAgdXBkYXRlKCk7XHJcbiAgICB3aW5kb3cuc2V0VGltZW91dCh1cGRhdGUsIDEwMDApO1xyXG5cclxuXHJcbiAgICAvLyBBZGQgZXZlbnQgaGFuZGxlcnMgdG8gdGhlIGlucHV0c1xyXG4gICAgZnVuY3Rpb24gaW5wdXRfY2hhbmdlKCkge1xyXG4gICAgICAgIHZhciBlZGl0b3IgPSAkKHRoaXMpLmRhdGEoJ2VkaXRvcicpO1xyXG4gICAgICAgIHZhciB0ZW1wbGF0ZSA9ICQodGhpcykuZGF0YSgndGVtcGxhdGUnKTtcclxuICAgICAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlLmNsb25lKHRydWUpO1xyXG4gICAgICAgIHRlbXBsYXRlLmZpbmQoJy5wbGFjZWhvbGRlcicpLmVhY2goZnVuY3Rpb24oaSwgZWwpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5yZXBsYWNlV2l0aCgkKCQodGhpcykuZGF0YSgnaW5wdXQnKSkudmFsKCkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBlZGl0b3Iuc2Vzc2lvbi5zZXRWYWx1ZSh0ZW1wbGF0ZS50ZXh0KCkpO1xyXG4gICAgfVxyXG4gICAgaW5wdXRzLm9uKCdpbnB1dCcsIGlucHV0X2NoYW5nZSkub24oJ2NoYW5nZScsIGlucHV0X2NoYW5nZSk7XHJcbiAgICBpZihpbnB1dHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGlucHV0X2NoYW5nZS5jYWxsKGlucHV0c1swXSk7XHJcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlucHV0X2NoYW5nZS5jYWxsKGlucHV0c1swXSk7XHJcbiAgICAgICAgfSwgMTAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVtb3ZlIG9yaWdpbmFsIGVsZW1lbnRcclxuICAgIGNvZGUuZGV0YWNoKCk7XHJcblxyXG4gICAgaWYoaGFzX2Nzcykge1xyXG4gICAgICAgIGNzc19lZGl0b3IuYXBwZW5kKGlucHV0cyk7XHJcbiAgICB9XHJcbn1cclxuIl19
