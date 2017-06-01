(function () {
  'use strict';

  angular
    .module('macroscopeKiosk')
    .service('macroscopes', macroscopes);

  /** @ngInject */
  function macroscopes() {
    var iteration = [
       {
        'id': 'iteration13',
        'logo': 'cosmicweb.jpg',
        'title': "Play with Scale",
        'subtitle': 'Iteration 13',
        'data': [
            {
              'id': 'cosmicweb',
              'title': 'The Cosmic Web',
              'subtitle': 'And the network behind it',
              'url': 'http://cosmicweb.barabasilab.com/viz/#2',
              'instructions-template': 'instructions-charting-culture.tmpl.html',
              'digging-deeper-template': 'digging-deeper-charting-culture.tmpl.html',
              'makers-template': 'makers-charting-culture.tmpl.html',
              'logo': 'cosmicweb.jpg',
              'type': 'iframe',
              'description': '<p>Rotate. Zoom. Immerse yourself in a network of 24,000 galaxies.</p> <p>Astronomers and network scientists worked with an information designer to visualize three different network models to help them understand how the universe is structured and how galaxies are connected.</p>'
            },
            {
              'id': 'histography',
              'title': 'Histography',
              'subtitle': 'An interactive timeline',
              'url': 'http://histography.io/',
              'instructions-template': 'instructions-earth.tmpl.html',
              'digging-deeper-template': 'digging-deeper-earth.tmpl.html',
              'makers-template': 'makers-earth.tmpl.html',
              'logo': 'histography.jpg',
              'type': 'iframe',
              'description':'<p>Filter by topic or pick a time period to browse the past.</p> <p><i>Histography</i> is an interactive timeline that spans millions of years, from the Big Bang to today.</p>'
            },
           {
            'id': 'megaregions',
            'title': 'Megaregions of the US',
            'subtitle': 'Mapping commuter patterns',
            'url': 'http://discovery.dartmouth.edu/megaregions/scimaps.html',
            'instructions-template': 'instructions-mapping-global-news.tmpl.html',
            'digging-deeper-template': 'digging-deeper-mapping-global-news.tmpl.html',
            'makers-template': 'makers-mapping-global-news.tmpl.html',
            'logo': 'megaregions.jpg',
            'type': 'iframe',
             'description':'<p>Tap to see the name of your new megaregion.</p> <p>Every day, millions of Americans leave home and head to work, cutting across neighborhood, city, and state lines. This map depicts how state lines would look if we drew them to reflect the transportation patterns that shape our lives. </p>'
          },
          {
            'id': 'sciencepaths',
            'title': 'Science Paths',
            'subtitle': 'The random impact rule',
            'url': 'http://sciencepaths.kimalbrecht.com/',
            'instructions-template': 'instructions-academy-scope.tmpl.html',
            'digging-deeper-template': 'digging-deeper-academy-scope.tmpl.html',
            'makers-template': 'makers-academy-scope.tmpl.html',
            'logo': 'sciencepaths.jpg',
            'type': 'iframe',
            'description':'<p>Each line represents one scientist’s career. Follow it to find the peak.</p><p>Can you predict the timing of a scientist’s most influential paper? Do scientists tend to produce their most influential work at the end of their career? In a word, no.</p>'
          }
        ]
      },


      {
        'id': 'iteration12',
        'logo': 'smelly.png',
        'title': "Make Sense of Science",
        'subtitle': 'Iteration 12',
        'data': [
            {
              'id': 'smelly-maps',
              'title': 'Smelly Maps',
              'subtitle': 'Charting urban smellscapes',
              'url': 'http://goodcitylife.org/macroscope/',
              'instructions-template': 'instructions-earth.tmpl.html',
              'digging-deeper-template': 'digging-deeper-earth.tmpl.html',
              'makers-template': 'makers-earth.tmpl.html',
              'logo': 'smelly.png',
              'type': 'iframe',
              'description':'<p>Touch a street to see what it smells like.</p><p>The Good City Life team gathered geotagged social media posts from Flickr, Instagram, and Twitter that included smell-related words and mapped them. Explore the complex aromas of London, Boston, Chicago, and other world cities.</p>'
            },
           {
            'id': 'hathitrust',
            'title': 'HathiTrust',
            'subtitle': 'Storehouse of knowledge',
            'url': 'http://demo.cns.iu.edu/macroscopes/hathi/',
            'instructions-template': 'instructions-mapping-global-news.tmpl.html',
            'digging-deeper-template': 'digging-deeper-mapping-global-news.tmpl.html',
            'makers-template': 'makers-mapping-global-news.tmpl.html',
            'logo': 'htrc.png',
            'type': 'iframe',
             'description':'<p>Drag your finger over the timeline.</p><p>The HathiTrust Digital Library is a collective “elephant’s memory” or storehouse of knowledge. Explore the diversity in this collection of more than 14 million publications spanning 2000 years.</p>'
          },
          {
            'id': 'excellence-networks',
            'title': 'Excellence Networks',
            'subtitle': 'Publish or perish together',
            'url': 'http://excellence-networks.net/multitouch/',
            'instructions-template': 'instructions-academy-scope.tmpl.html',
            'digging-deeper-template': 'digging-deeper-academy-scope.tmpl.html',
            'makers-template': 'makers-academy-scope.tmpl.html',
            'logo': 'excellence.png',
            'type': 'iframe',
            'description':'<p>Pick a subject and see which institutions publish together.</p><p>When research institutions collaborate, do they produce high impact papers? Do they collaborate with nearby institutions or are their collaborators far away? Scroll down to see how your favorite institution ranks.</p>'
          },
          {
            'id': 'fleetmon',
            'title': 'FleetMon Explorer',
            'subtitle': 'Tracking the seven seas',
//            'url': 'https://www.youtube.com/embed/CP-TcDtSFDI',
            'url': 'assets/videos/fleetmon.webm',
            'instructions-template': 'instructions-charting-culture.tmpl.html',
            'digging-deeper-template': 'digging-deeper-charting-culture.tmpl.html',
            'makers-template': 'makers-charting-culture.tmpl.html',
            'logo': 'fleetmon.png',
            'type': 'video',
            'description': '<p>Touch the screen to start the video.</p><p>Watch a week of ship traffic on the seven seas as seen from space. The movements of hundreds of thousands of vessels were captured using shore and satellite-based tracking data from FleetMon and its partner, Luxspace.</p>'
          }
        ]
      },
      {
        'id': 'iteration11',
        'logo': 'earth.jpg',
        'title': "Interact with Science",
        'subtitle': 'Iteration 11',
        'data': [
          {
            'id': 'earth',
            'title': 'Earth',
            'subtitle': 'Weather on a worldwide scale',
            'url': 'http://earth.nullschool.net/?kiosk',
            'instructions-template': 'instructions-earth.tmpl.html',
            'digging-deeper-template': 'digging-deeper-earth.tmpl.html',
            'makers-template': 'makers-earth.tmpl.html',
            'logo': 'earth.jpg',
            'type': 'iframe',
            'description':'<p>Spin the globe. Find a place. </p><p>Watch the weather unfold with data updates every three hours. Touch the menu in the lower left to see wave height, pollution levels, temperature, and more.</p>'
          },
          {
            'id': 'academy-scope',
            'title': 'AcademyScope',
            'subtitle': 'Exploring the scientific landscape',
            'url': 'http://www.nap.edu/academy-scope/?kiosk=true',
            'instructions-template': 'instructions-academy-scope.tmpl.html',
            'digging-deeper-template': 'digging-deeper-academy-scope.tmpl.html',
            'makers-template': 'makers-academy-scope.tmpl.html',
            'logo': 'academy-scope.png',
            'type': 'iframe',
            'description':'<p>Drag a book and see how it is connected to similar publications.</p><p>Navigate everything the National Academies of Sciences, Engineering, and Medicine press has published in the last 20 years. AcademyScope uses the full text of each publication to find related publications, connected by lines. </p>'
          },
          {
            'id': 'mapping-global-news',
            'title': 'Mapping Global News',
            'subtitle': 'Local news from a global perspective',
            'url': 'http://data.gdeltproject.org/blog/news-cooccurrence-globe/globe_cooccur_kiosk.html',
            'instructions-template': 'instructions-mapping-global-news.tmpl.html',
            'digging-deeper-template': 'digging-deeper-mapping-global-news.tmpl.html',
            'makers-template': 'makers-mapping-global-news.tmpl.html',
            'logo': 'mapping-global-society.png',
            'type': 'iframe',
            'description':'<p>Tap a country and see its connections in the news.</p><p>Connections are drawn between countries based on the news: online, television, print, and radio in over 65 different languages. Do you notice any surprising connections? This is the power of computing on the entire world.</p><p>Note: Some of this macroscope’s features have been disabled because they are no longer supported by the browser.</p>'
          },
          {
            'id': 'charting-culture',
            'title': 'Charting Culture',
            'subtitle': '2,600 years of human history in 5 minutes',
            'url': 'assets/videos/ChartingCulture.webm',
            'instructions-template': 'instructions-charting-culture.tmpl.html',
            'digging-deeper-template': 'digging-deeper-charting-culture.tmpl.html',
            'makers-template': 'makers-charting-culture.tmpl.html',
            'logo': 'charting-culture.jpg',
            'type': 'video',
            'description':'<p>Touch the screen to start the video.</p><p>Charting Culture plots life and death locations for more than 120,000 notable European and American cultural figures over the past 2,600 years. Birthplaces are blue dots and places of death are red dots. </p>'
          }
        ]
      }
    ];

    //    console.log(getIterations());
    //    console.log(getScopes());

    this.getIterations = getIterations;
    this.findIterationsById = findIterationsById;
    this.getScopes = getScopes;
    this.getIterationScopes = getIterationScopes;
    this.findById = findById;
    this.findParent = findParent;

    function getIterations() {
      return iteration;
    }

    // Util for finding an iteration object by its 'id' property among an array
    function findIterationsById(id) {
      for (var i = 0; i < iteration.length; i++) {
        if (iteration[i].id === id) {
          return iteration[i];
        }
      }
      return null;
    }

    // Util for finding all macroscopes
    function getScopes() {
      var allData = [];
      for (var i = 0; i < iteration.length; i++) {
        allData = allData.concat(iteration[i].data);
      }
      return allData;
    }

    // Util for finding macroscope data in a specific iteration
    function getIterationScopes(id) {
      var findScope = findIterationsById(id);
      return findScope.data;
    }

    // Util for finding any macroscope object by its 'id' property among an array
    function findById(id) {
      for (var i = 0; i < iteration.length; i++) {
        for (var k = 0; k < iteration[i].data.length; k++) {
          if (iteration[i].data[k].id === id) {
            return iteration[i].data[k];
          }
        }
      }
      return null;
    }

    // Util for finding Parent iteration of scope (for breadcrumbs)
    function findParent(id) {
      for (var i = 0; i < iteration.length; i++) {
        for (var k = 0; k < iteration[i].data.length; k++) {
          if (iteration[i].data[k].id === id) {
            return iteration[i];
          }
        }
      }
      return null;
    }
  }

})();
