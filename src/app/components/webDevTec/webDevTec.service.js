(function() {
  'use strict';

  angular
      .module('macroscopeKiosk')
      .service('webDevTec', webDevTec);

  /** @ngInject */
  function webDevTec() {
    var data = [
      {
        'id': 'earth',
        'title': 'Earth',
        'url': 'http://earth.nullschool.net/',
        'explore': 'Skate ipsum dolor sit amet, kickturn sick slide heel flip bank. Opposite footed downhill acid drop nose blunt birdie. Shinner locals finger flip bail flail. Coping hurricane air Skull and Sword slob air egg plant. Hardware hospital flip nose-bump axle set kickturn. Aerial crailtap trucks goofy footed rails. Skater darkslide noseblunt slide berm disaster Chet Thomas. Gnarly boardslide ollie north downhill stalefish. Kidney Saran Wrap Ron Allen shinner sick 50-50. Air late kidney rad nosegrind.',
        'read': 'Bacon ipsum dolor amet spare ribs jowl capicola ham fatback beef ribs, kielbasa ball tip chuck andouille. Shoulder prosciutto ham, brisket pork loin filet mignon shankle flank frankfurter. Drumstick porchetta short loin, meatball cupim sausage biltong shoulder bacon tri-tip ham hock. Spare ribs strip steak porchetta sirloin. Tri-tip cow meatloaf drumstick ham turkey. Tongue swine turkey landjaeger shoulder tri-tip spare ribs, pig frankfurter filet mignon shank alcatra turducken pork belly shankle.',
        'connect': 'earZombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris. Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat cerebella viventium. Qui animated corpse, cricket bat max brucks terribilem incessu zomby. The voodoo sacerdos flesh eater, suscitat mortuos comedere carnem virus. Zonbi tattered for solum oculi eorum defunctis go lum cerebro. Nescio brains an Undead zombies. Sicut malus putrid voodoo horror. Nigh tofth eliv ingdead.',
        'logo': 'earth.png'
      },
      {
        'id': 'urban-observatory',
        'title': 'Urban Observatory',
        'url': 'http://www.urbanobservatory.org/compare/index.html',
        'explore': 'Skate ipsum dolor sit amet, kickturn sick slide heel flip bank. Opposite footed downhill acid drop nose blunt birdie. Shinner locals finger flip bail flail. Coping hurricane air Skull and Sword slob air egg plant. Hardware hospital flip nose-bump axle set kickturn. Aerial crailtap trucks goofy footed rails. Skater darkslide noseblunt slide berm disaster Chet Thomas. Gnarly boardslide ollie north downhill stalefish. Kidney Saran Wrap Ron Allen shinner sick 50-50. Air late kidney rad nosegrind.',
        'read': 'Bacon ipsum dolor amet spare ribs jowl capicola ham fatback beef ribs, kielbasa ball tip chuck andouille. Shoulder prosciutto ham, brisket pork loin filet mignon shankle flank frankfurter. Drumstick porchetta short loin, meatball cupim sausage biltong shoulder bacon tri-tip ham hock. Spare ribs strip steak porchetta sirloin. Tri-tip cow meatloaf drumstick ham turkey. Tongue swine turkey landjaeger shoulder tri-tip spare ribs, pig frankfurter filet mignon shank alcatra turducken pork belly shankle.',
        'connect': 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris. Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat cerebella viventium. Qui animated corpse, cricket bat max brucks terribilem incessu zomby. The voodoo sacerdos flesh eater, suscitat mortuos comedere carnem virus. Zonbi tattered for solum oculi eorum defunctis go lum cerebro. Nescio brains an Undead zombies. Sicut malus putrid voodoo horror. Nigh tofth eliv ingdead.',
        'logo': 'urban-observatory.png'
      },
      {
        'id': 'ibm-think',
        'title': 'IBM Think!',
        'url': 'https://www.youtube.com/embed/8eu6DHBQyGs?autoplay=1&fs=0&modestbranding=1&rel=0&showinfo=0',
        'explore': 'Skate ipsum dolor sit amet, kickturn sick slide heel flip bank. Opposite footed downhill acid drop nose blunt birdie. Shinner locals finger flip bail flail. Coping hurricane air Skull and Sword slob air egg plant. Hardware hospital flip nose-bump axle set kickturn. Aerial crailtap trucks goofy footed rails. Skater darkslide noseblunt slide berm disaster Chet Thomas. Gnarly boardslide ollie north downhill stalefish. Kidney Saran Wrap Ron Allen shinner sick 50-50. Air late kidney rad nosegrind.',
        'read': 'Bacon ipsum dolor amet spare ribs jowl capicola ham fatback beef ribs, kielbasa ball tip chuck andouille. Shoulder prosciutto ham, brisket pork loin filet mignon shankle flank frankfurter. Drumstick porchetta short loin, meatball cupim sausage biltong shoulder bacon tri-tip ham hock. Spare ribs strip steak porchetta sirloin. Tri-tip cow meatloaf drumstick ham turkey. Tongue swine turkey landjaeger shoulder tri-tip spare ribs, pig frankfurter filet mignon shank alcatra turducken pork belly shankle.',
        'connect': 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris. Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat cerebella viventium. Qui animated corpse, cricket bat max brucks terribilem incessu zomby. The voodoo sacerdos flesh eater, suscitat mortuos comedere carnem virus. Zonbi tattered for solum oculi eorum defunctis go lum cerebro. Nescio brains an Undead zombies. Sicut malus putrid voodoo horror. Nigh tofth eliv ingdead.',
        'logo': 'ibm-think.png'
      },
      {
        'id': 'mapping-global-society',
        'title': 'Mapping Global Society',
        'url': 'http://www.gdeltproject.org/',
        'explore': 'Skate ipsum dolor sit amet, kickturn sick slide heel flip bank. Opposite footed downhill acid drop nose blunt birdie. Shinner locals finger flip bail flail. Coping hurricane air Skull and Sword slob air egg plant. Hardware hospital flip nose-bump axle set kickturn. Aerial crailtap trucks goofy footed rails. Skater darkslide noseblunt slide berm disaster Chet Thomas. Gnarly boardslide ollie north downhill stalefish. Kidney Saran Wrap Ron Allen shinner sick 50-50. Air late kidney rad nosegrind.',
        'read': 'Bacon ipsum dolor amet spare ribs jowl capicola ham fatback beef ribs, kielbasa ball tip chuck andouille. Shoulder prosciutto ham, brisket pork loin filet mignon shankle flank frankfurter. Drumstick porchetta short loin, meatball cupim sausage biltong shoulder bacon tri-tip ham hock. Spare ribs strip steak porchetta sirloin. Tri-tip cow meatloaf drumstick ham turkey. Tongue swine turkey landjaeger shoulder tri-tip spare ribs, pig frankfurter filet mignon shank alcatra turducken pork belly shankle.',
        'connect': 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris. Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat cerebella viventium. Qui animated corpse, cricket bat max brucks terribilem incessu zomby. The voodoo sacerdos flesh eater, suscitat mortuos comedere carnem virus. Zonbi tattered for solum oculi eorum defunctis go lum cerebro. Nescio brains an Undead zombies. Sicut malus putrid voodoo horror. Nigh tofth eliv ingdead.',
        'logo': 'mapping-global-society.png'
      },
      {
        'id': 'academy-scope',
        'title': 'Academy Scope',
        'url': 'http://www.nap.edu/academy-scope',
        'explore': 'Skate ipsum dolor sit amet, kickturn sick slide heel flip bank. Opposite footed downhill acid drop nose blunt birdie. Shinner locals finger flip bail flail. Coping hurricane air Skull and Sword slob air egg plant. Hardware hospital flip nose-bump axle set kickturn. Aerial crailtap trucks goofy footed rails. Skater darkslide noseblunt slide berm disaster Chet Thomas. Gnarly boardslide ollie north downhill stalefish. Kidney Saran Wrap Ron Allen shinner sick 50-50. Air late kidney rad nosegrind.',
        'read': 'Bacon ipsum dolor amet spare ribs jowl capicola ham fatback beef ribs, kielbasa ball tip chuck andouille. Shoulder prosciutto ham, brisket pork loin filet mignon shankle flank frankfurter. Drumstick porchetta short loin, meatball cupim sausage biltong shoulder bacon tri-tip ham hock. Spare ribs strip steak porchetta sirloin. Tri-tip cow meatloaf drumstick ham turkey. Tongue swine turkey landjaeger shoulder tri-tip spare ribs, pig frankfurter filet mignon shank alcatra turducken pork belly shankle.',
        'connect': 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris. Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat cerebella viventium. Qui animated corpse, cricket bat max brucks terribilem incessu zomby. The voodoo sacerdos flesh eater, suscitat mortuos comedere carnem virus. Zonbi tattered for solum oculi eorum defunctis go lum cerebro. Nescio brains an Undead zombies. Sicut malus putrid voodoo horror. Nigh tofth eliv ingdead.',
        'logo': 'academy-scope.png'
      },
      {
        'id': 'cultural-history',
        'title': 'A Cultural History',
        'url': 'https://www.youtube.com/embed/4gIhRkCcD4U?autoplay=1&fs=0&modestbranding=1&rel=0&showinfo=0',
        'explore': 'Skate ipsum dolor sit amet, kickturn sick slide heel flip bank. Opposite footed downhill acid drop nose blunt birdie. Shinner locals finger flip bail flail. Coping hurricane air Skull and Sword slob air egg plant. Hardware hospital flip nose-bump axle set kickturn. Aerial crailtap trucks goofy footed rails. Skater darkslide noseblunt slide berm disaster Chet Thomas. Gnarly boardslide ollie north downhill stalefish. Kidney Saran Wrap Ron Allen shinner sick 50-50. Air late kidney rad nosegrind.',
        'read': 'Bacon ipsum dolor amet spare ribs jowl capicola ham fatback beef ribs, kielbasa ball tip chuck andouille. Shoulder prosciutto ham, brisket pork loin filet mignon shankle flank frankfurter. Drumstick porchetta short loin, meatball cupim sausage biltong shoulder bacon tri-tip ham hock. Spare ribs strip steak porchetta sirloin. Tri-tip cow meatloaf drumstick ham turkey. Tongue swine turkey landjaeger shoulder tri-tip spare ribs, pig frankfurter filet mignon shank alcatra turducken pork belly shankle.',
        'connect': 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris. Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat cerebella viventium. Qui animated corpse, cricket bat max brucks terribilem incessu zomby. The voodoo sacerdos flesh eater, suscitat mortuos comedere carnem virus. Zonbi tattered for solum oculi eorum defunctis go lum cerebro. Nescio brains an Undead zombies. Sicut malus putrid voodoo horror. Nigh tofth eliv ingdead.',
        'logo': 'cultural-history.png'
      }
    ];

    this.getTec = getTec;
    this.findById = findById;

    function getTec() {
      return data;
    }
    
    // Util for finding an object by its 'id' property among an array
    function findById(id) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].id === id) {
          return data[i];
        }
      }
      return null;
    }
  }

})();
