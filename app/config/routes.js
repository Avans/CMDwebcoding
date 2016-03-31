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