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
              'descriptionTitle':'<p>Rotate. Zoom. Immerse yourself in a network of 24,000 galaxies.</p>',
              'descriptionLong':'<p>The concept of the cosmic web—viewing the universe as a set of discrete galaxies held together by gravity—is deeply ingrained in cosmology. Yet, little is known about the architecture of this network or its characteristics. Visual researcher and information designer Kim Albrecht worked with Albert-László Barabási, of Northeastern University’s Center for Complex Network Research, and a team of astronomers to construct multiple models of the cosmic web. The project team used data from 24,000 galaxies to offer blueprints for how galaxies fit together. The resulting interactive visualizations helped the team imagine the cosmic web, showed them differences between the models, and provided insight into the fundamental structure of the universe.</p><p>Immerse yourself in a network of 24,000 galaxies with more than 100,000 connections. By selecting a model, panning and zooming, and filtering the data, you can compare three distinct models of the cosmic web.</p>',
              'description': ' <p>Astronomers and network scientists worked with an information designer to visualize three different network models to help them understand how the universe is structured and how galaxies are connected.</p>'
              
            },
            {
              'id': 'histography',
              'title': 'Histography',
              'subtitle': 'An interactive timeline',
              'url': 'http://histography.io/exhibtion.html',
              'instructions-template': 'instructions-earth.tmpl.html',
              'digging-deeper-template': 'digging-deeper-earth.tmpl.html',
              'makers-template': 'makers-earth.tmpl.html',
              'logo': 'histography.jpg',
              'type': 'iframe',
              'descriptionTitle':'<p>Filter by topic or pick a time period to browse the past.</p>',
              'descriptionLong':'<p><i>Histography</i> is an award-winning interactive timeline. The site draws historical events from Wikipedia, and updates itself daily as new events are added to the online encyclopedia. Matan Stauber, an interactive designer and code developer in Tel Aviv, created <i>Histography</i> as a final project at Bezalel Academy of Arts and Design in Jerusalem.</p><p></p>',
              'description':'<p><i>Histography</i> is an interactive timeline that spans billions of years, from the Big Bang to today.</p>'

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
            'descriptionTitle':'<p>Tap to see the name of your new megaregion.</p>',
            'descriptionLong':'<p>Every day, millions of Americans leave home and head to work, cutting across neighborhood, city, and state lines as they weave together a new geography of commuter patterns. These interlinked megaregions, connected by economic ties, suggest that new kinds of geographic categories are necessary if we wish to accurately describe the functional network of flows and relationships which shape our lives in the modern world. </p><p><i>Megaregions</i> of the US is the work of historical geographer Garrett Dash Nelson, a postdoctoral researcher at Darmouth College, and Alasdair Rae, an urban and regional data analyst at the University of Sheffield in England. The colorful starbursts are made up of approximately four million lines. Each line shows the linkage of commuters between one census tract and another, with the width proportional to the number of commuters, based on data from the 2010 census. Using an algorithmic technique called <i>community</i> detection to group statistically significant clusters of related places, the map is then divided up into distinct megaregions. </p><p>Can you find your own hometown, your own commute, and your new megaregion? Look for places on the map where many commutes cut across megaregional boundaries, and for other places where a single city acts as a center of gravity for commuter traffic. What might our political and planning systems look like if we made these megaregions the basis for dividing up the United States?</p>',
            'description':' <p>Every day, millions of Americans leave home and head to work, cutting across neighborhood, city, and state lines. This map depicts how state borders would look if we drew them to reflect the transportation patterns that shape our lives. </p>'
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
            'descriptionTitle':'<p>Each line represents one scientist’s career. Follow it to find the peak.</p>',
            'descriptionLong':'<p>Northeastern University’s Center for Complex Network Research members Kim Albrecht and Albert-László Barabási worked with Roberta Sinatra, a theoretical physicist from Budapest, to analyze the publication histories of nearly 10,000 scientists working in seven disciplines, connecting each paper with its long-term impact on the scientific community. They found that the most influential work of a scientist’s career is randomly distributed within her body of work. That is, the highest-impact work has the same probability of falling anywhere in the sequence of papers published by a scientist. It could be the first publication, appear mid-career, or emerge last. The team coined this the random impact rule.</p><p>This visualization shows the random impact rule in all its power. You can explore careers in different disciplines and rank scientists according to different career parameters, like the total number of papers in each scientist’s career. You will find impact peaks occurring all over the place, from the beginning of a career on the left to the end of a career on the right.</p>',
            'description':'<p>Can you predict the timing of a scientist’s most influential paper? Do scientists tend to produce their most influential work at the end of their career? In a word, no.</p>'
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
              'descriptionTitle':'<p>Touch a street to see what it smells like.</p>',
              'descriptionLong':'<p>What does your street smell like? Humans can differentiate thousands of different odors. Yet, city officials and urban planners deal only with the management of a few bad odors. In creating <em>Smelly Maps</em>, University of Turin computer science professor Rossano Schifanella and Bell Labs, and social dynamics researchers Luca Maria Aiello and Daniele Quercia teamed up to introduce a new stream of research that celebrates the complex aromas of our cities and makes it possible to use this information in urban design.</p><p>To map urban smellscapes, the project team first created a lexicon of smell-related words. Then, they gathered geotagged social media posts from Flickr, Instagram, and Twitter that included smell-related words. Finally, the smells people posted about were mapped on each street segment.</p><p>Click on a street to see how it smells. As you might expect, nature smells are strong near parks and animal smells dominate at the zoo. Where do you find the strongest food smells? </p>',
              'description':'<p>The Good City Life team gathered geotagged social media posts from Flickr, Instagram, and Twitter that included smell-related words and mapped them. Explore the complex aromas of London, Boston, Chicago, and other world cities.</p>'
            },
           {
            'id': 'hathitrust',
            'title': 'HathiTrust',
            'subtitle': 'Storehouse of knowledge',
            // 'url': 'http://web.avl.indiana.edu/~pdbeard/htrc-macroscope-master/',
            'url': 'http://demo.cns.iu.edu/macroscopes/hathi/',
            'instructions-template': 'instructions-mapping-global-news.tmpl.html',
            'digging-deeper-template': 'digging-deeper-mapping-global-news.tmpl.html',
            'makers-template': 'makers-mapping-global-news.tmpl.html',
            'logo': 'htrc.png',
            'type': 'iframe',
            'descriptionTitle':'<p>Drag your finger over the timeline.</p>',
            'descriptionLong':'<p>Run by a consortium of international research libraries, the HathiTrust Digital Library serves as a shared and growing repository for digital copies of more than 14 million publications that span 2000 years. Visualization software developer David Reagan, curator Lisel Record, and information scientist Katy Bӧrner developed this visualization to delve into the geographic and temporal diversity and reach of the collection using freely available metadata.</p><p>Yellow circles show publication locations, with the size of the circle showing how many publications were printed in that location. Lines connect publication locations to places where that language is spoken, illustrating the connection between publication location and potential readers. </p><p>If you look at publications from the years 1200-1400 you see the prominence of Persian science and culture reflected in the high number of publications from Iran and other Middle Eastern locations. If, on the other hand, you look at publications from the last 50 years, a colorful swirl of publications bubble up from many regions and flow to readers around the globe. </p>',
            'description':'<p>The HathiTrust Digital Library is a collective “elephant’s memory” or storehouse of knowledge. Explore the diversity in this collection of more than 14 million publications spanning 2000 years.</p>'
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
            'descriptionTitle':'<p>Pick a subject and see which institutions publish together.</p>',
            'descriptionLong':'<p>While it may be simple to guess which research institutions are at the top of their game, it is hard to create a statistical model to measure and map this. Lutz Bornmann, a sociologist of science at the Max Planck Society; Rüdiger Mutz, a Swiss researcher in social psychology and higher education; Moritz Stefaner, an independent data visualization expert; and Félix de Moya Anegón, senior researcher at SCImago, took up the challenge and created <em>Excellence Networks</em>.</p><p>This web application shows how universities and other research institutions collaborate. Institutions in the <em>SCImago Institutions Rankings</em>&nbsp; were categorized by subject area. Each institution was then mapped in relation to its collaborators. The resulting networks show how successfully—in terms of citations—an institution has collaborated with others working in the same field. </p>',
            'description':'<p>When research institutions collaborate, do they produce high-impact papers? Do they collaborate with nearby institutions or are their collaborators far away? Scroll down to see how your favorite institution ranks.</p>'
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
            'descriptionTitle':'<p>This video will start automatically.</p>',
            'descriptionLong':'<p>Many cargo ships, tankers, ferries, cruise ships, yachts and tugs carry transponders that transmit their locations. That data is then available to amateur ship spotters and maritime businesses alike through the interactive <em> FleetMon Explorer </em> &nbsp;tool. Using the tool you can follow the flow of jet fuel and agricultural commodities around the globe, track a fleet of cruise ships in real time, or monitor traffic at ports around the world.</p>',
            'description': '<p>Watch a week of ship traffic on the seven seas as seen from space. The movements of hundreds of thousands of vessels were captured using shore- and satellite-based tracking data from FleetMon and its partner, Luxspace.</p>'
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
            'descriptionTitle':'<p>Spin the globe. Find a place. </p>',
            'descriptionLong':'<p>Whether we like it or complain about it, bask in it or suffer from it, we all are affected by the weather. This essential truth becomes readily apparent when viewing <em>Earth</em>, the work of software engineer Cameron Beccario.</p><p>Using data from the Global Forecast System, <em>Earth</em> visualizes worldwide weather patterns using animated wind streams, color coded according to velocity, that sweep across a three-dimensional globe. Spin the globe and zoom in on a desired location. Tap that location to bring up further information about exact coordinates, wind speed, and temperature, with all information updated every three hours. See the world from different perspectives by changing the projection to stereographic or Waterman Butterfly.</p><p> When <em>Earth</em> was first introduced in December 2013, it only visualized wind patterns. Since then, however, Beccario has added new overlays that show carbon monoxide concentration, dust and sulfate extinction, and measured temperature. <em>Earth</em> also shows the perceived temperature which Beccario calls the Misery Index, borrowing a term from economics.</p>',
            'description':'<p>Touch the menu in the lower left to see wave height, pollution levels, temperature, and more.</p>'
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
            'descriptionTitle':'<p>Pick a book and see how it is connected to other publications.</p>',
            'descriptionLong':'<p><em>AcademyScope</em> represents a collaborative effort between the National Academy of Sciences and Indiana University’s Cyberinfrastructure for Network Science Center. You can browse reports by topic and subtopic, see the relatedness of reports via elaborate networks of book covers dynamically displayed on the screen, and access detailed information about individual reports.</p><p> This version of <em>AcademyScope</em> consists of two main interfaces. The Topic View provides a proportional depiction of the number of titles within each sub-topic network. Sub-topic globes display relative publishing activity within individual sub-topics. The Sub-Topic View displays a network representation of the relationship between Academies reports based on full-text lexical analysis of each publication. This allows the user to highlight any given title and its related publications and also to view the number of titles published in that sub-topic by year.</p>',
            'description':'<p>Navigate everything the National Academies of Sciences, Engineering, and Medicine press has published in the last 20 years. AcademyScope uses the full text of each publication to find related publications, connected by lines. </p>'
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
            'descriptionTitle':'<p>Tap a country and see its connections in the news.</p>',
            'descriptionLong':'<p>This macroscope was created by Kalev H. Leetaru, an expert on big data and global society. It uses as its source material, quite literally, the news of the world. The visualization explores how new stories group countries into distinct clusters, creating a geographic network over the planet, visualizing “communities” as seen through the eyes of the world’s presses. In essence, for every monitored news article published anywhere in the world, it compiles a list of countries mentioned. </p><p>It is important to note that this is not how often coverage from one country mentions other countries; it is how often coverage mentions two countries in the same article. In other words, it is about context.</p><p>Countries that are frequently mentioned together might reflect geographic proximity, but also economic and political ties, or joint involvement in a major international event. <span style="color:blue;">Blue</span> incoming lines indicate countries where at least 10% of the coverage mentioning the source country also mentioned the selected country. <span style="color:red;">Red</span> outgoing lines indicate countries where at least 10% of the coverage mentioning the selected country also mentioned the destination country.</p><p>The size and number of energy pulses moving along the line indicate how often two countries are connected in the news. In a given week, nearly every country is mentioned alongside of every other country at least once, so the visualization uses the cutoff of 10% to highlight only the strongest connections.</p>',
            'description':'<p>Connections are drawn between countries that are mentioned together in the news: online, television, print, and radio in over 65 different languages. Do you notice any surprising connections? </p><p>Note: Some of this macroscope’s features have been disabled because they are no longer supported by the browser.</p>'
          },
          {
            'id': 'charting-culture',
            'title': 'Charting Culture',
            'subtitle': '2,600 years of history in 5 minutes',
            'url': 'assets/videos/ChartingCulture.webm',
            'instructions-template': 'instructions-charting-culture.tmpl.html',
            'digging-deeper-template': 'digging-deeper-charting-culture.tmpl.html',
            'makers-template': 'makers-charting-culture.tmpl.html',
            'logo': 'charting-culture.jpg',
            'type': 'video',
            'descriptionTitle':'<p>This video will start automatically.</p>',
            'descriptionLong':'<p>University of Texas art historian Maximilian Schich and Mauro Martino, head of IBM’s Watson Cognitive Visualization Lab, created <em>Charting Culture</em>&nbsp;. The animation debuted in August of 2014 and went on to accumulate over 1 million views on YouTube.</p><p>In just five minutes, the animation covers 2,600 years of European and American history, from 600 BCE to 2012 CE, by tracking 120,000 individuals whose birth and death locations were recorded in the knowledge web Freebase. The figures whose migrations are traced are remarkably varied: from the Greek mathematician Pythagoras to the American Jazz Age entertainer Al Jolson, from the Roman emperor Marcus Aurelius to the Gothic painter Henry Fuseli, and from the composer Carl Maria von Weber to the father of sexuality studies, Havelock Ellis.</p><p>Birthplaces, represented by <span style="color:blue;">blue</span> dots, are connected by arcs to places of death, denoted by <span style="color:red;">red</span> dots. The animation reveals how increased concentrations of death places indicate how different cultural centers rise and fall in importance: for instance, how Paris and London supplant the dominance of Rome, how New York pulls Europeans from their places of birth, and how America’s west coast lures Easterners to cross plains and mountains with promises of a new life.</p>',
            'description':'<p>Charting Culture plots life and death locations for more than 120,000 notable European and American cultural figures over the past 2,600 years. Birthplaces are blue dots and places of death are red dots. </p>'
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
