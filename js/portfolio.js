(function() {
  var doc = document;
  var showMoreButton = doc.getElementById('show_more');
  var resizeTimeout;
  var oldSite = 'http://oldsite.henrygd.me/';
  var styleTag = doc.createElement('STYLE');
  var projects = [
    {
      title: 'Stories on a Map',
      img: 'soam-react',
      info: 'Stories application redesigned with React + Redux and Rails 5 API.',
      url: 'https://storiesonamap.henrygd.me',
      github: 'stories-on-a-map',
      lang: 'react'
    },
    {
      title: 'Hockey Sim',
      img: 'hockeysim',
      info: 'Simulate games between any two hockey teams.',
      url: 'https://hockeysim.netlify.com',
      github: 'hockey-sim',
      lang: 'react'
    },
    {
      title: 'BigPicture',
      img: 'bigpicture',
      info: 'Lightweight & framework independent JavaScript image / video viewer.',
      url: '/bigpicture',
      github: 'bigpicture',
      lang: 'js'
    },
    {
      title: 'GOTV Twitter Bot',
      img: 'votebot',
      info: 'Reminded targeted users of voter registration deadlines in their states.',
      url: 'https://twitter.com/gettothepolls/with_replies',
      lang: 'node'
    },
    {
      title: 'Static Contact Form',
      img: 'scf',
      info: "Contact form for static sites (in use below). Email relay system baked in.",
      url: '/static-contact-form',
      github: 'static-contact-form',
      lang: 'js'
    },
    {
      title: 'Email Relay',
      img: 'emailrelay',
      info: "Free email for static sites. Capped at 45 per week.",
      url: 'http://emailrelay.henrygd.me',
      github: 'email-relay-server',
      lang: 'ruby'
    },
    {
      title: 'Stories on a Map',
      img: 'soam',
      info: 'Read & submit stories arranged by approximate geographic location.',
      url: 'http://storiesonamap-original.henrygd.me',
      github: 'stories-on-a-map-original',
      lang: 'ruby'
    },
    {
      title: 'CFB Sim',
      img: 'cfbsim',
      info: 'Simulate games between any two college football teams.',
      url: 'https://cfbsim.netlify.com',
      github: 'cfbsim-react',
      lang: 'react'
    },
    {
      title: 'henrygd.me',
      img: 'henrygd',
      info: "The site you're on right now.",
      github: 'henrygd.github.io'
    },
    {
      title: 'UM softball preview',
      img: 'softball',
      info: 'Preview of the 2016 season with interactive player breakdown.',
      url: '/um-softball-preview',
      github: 'um-softball-preview'
    },
    {
      title: 'ColorFlow',
      img: 'colorflow',
      info: 'Smoothly transition many background / text colors on any element.',
      url: '/ColorFlow',
      github: 'ColorFlow'
    },
    {
      title: 'henrygd.me v2',
      img: 'henrygd2',
      info: 'Old personal site that was too fancy for its purpose.',
      url: oldSite,
    },
    {
      title: 'All Seas Cruises',
      img: 'allseas',
      info: 'Business site for All Seas Cruises & Travel.',
      url: 'https://allseascruises.com',
      github: 'allseascruises.github.io'
    },
    {
      title: 'Client database tool',
      img: 'clientdb',
      info: 'Web application for All Seas used to keep track of client information.',
      github: 'All-Seas-Client-Database-Application',
      lang: 'python'
    },
    {
      title: 'Nonprofit website builder',
      img: 'websitebuilder',
      info: 'Free static website builder. Formerly supported donations & contact form.',
      url: oldSite + 'makeawebsite',
      github: 'Nonprofit-Website-Builder',
      lang: 'python'
    },
    {
      title: 'Stripe relay server',
      img: 'stripeserver',
      info: 'Companion to the website builder to enable donations.',
      url: oldSite + 'stripeserver',
      github: 'Free-Stripe-Checkout-Server',
      lang: 'python'
    },
    {
      title: 'henrygd.me v1',
      img: 'henrygd1',
      info: 'An early attempt at a personal site with different themes. Menu now broken in Chrome.',
      url: '/old-broken-site',
      github: 'old-broken-site'
    },
    {
      title: 'Reddit /r/cfb flair generator',
      img: 'flairgen',
      info: 'First real web application I made outside of tutorials, circa summer 2014.',
      url: 'https://rcfb-flairgen.rhcloud.com',
      github: 'FlairGen',
      lang: 'python'
    },
    {
      title: 'Oldest thing I can find',
      img: 'boxing',
      url: 'http://web.archive.org/web/20051013064711/http://www.worldboxingvideoarchive.com/',
      info: '2005 home page for a boxing torrent site, in all its glory, thanks to the Internet Archive.',
    }
  ];

  (function initiate() {
    showMoreButton.addEventListener('click', showMoreProjects, false);
    // resize listener to adjust project text animation - uses timeout to avoid hundreds of calls
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateStoryText, 200);
    }, false);
    showMoreProjects();
  })();

  function showMoreProjects() {
    var projectHTML = '';
    var loopLength = projects.length > 6 ? 6 : projects.length;
    for (var i = 0; i < loopLength; i++) {
      var project = projects.shift();
      projectHTML +=
        '<div class="project" style="background-image:url(img/' + project.img + '.jpg)">' +
          '<H4 class="' + (project.lang || "html") + '-logo">' + project.title + '</H4>' +
          '<div class="project-info"><p>' + project.info + '</p></div>' +
          '<div class="project-buttons">' +
            (project.url ? '<a href="' + project.url +  '" class="button but-website">Website</a> ' : '') +
            (project.github ? '<a href="https://github.com/henrygd/' + project.github + '" class="button but-github">Github</a>' : '') +
          '</div>' +
        '</div>';
    }
    showMoreButton.insertAdjacentHTML('beforebegin', projectHTML);
    updateProjectCount();

    // update p height
    updateStoryText();
  }

  function updateStoryText() {
    // update project text / button animation height
    var innerStyle = '';
    var ps = doc.querySelectorAll('.project-info p');
    [].forEach.call(ps, function(el, index) {
      var height = el.clientHeight / 2;
      var parentProject = el.parentElement.parentElement;
      function getStyle(i) {
        var style = 'transform:translate3d(-50%, ' + i + height + 'px, 0);';
        return '-webkit-' + style + style;
      }
      innerStyle += '.project:nth-child(' + (index + 1) + '):hover h4{' + getStyle('-') +
        '}.project:nth-child(' + (index + 1) + '):hover .project-buttons{' + getStyle('') + '}';
    });
    styleTag.innerHTML = innerStyle;
    doc.head.appendChild(styleTag);
  }

  function updateProjectCount() {
    var count = projects.length;
    var message;
    if (count > 0) {
      message = 'Show more (' +  count + ' remaining)';
    } else {
      message = "That's all for now";
      showMoreButton.className += ' hide-before';
    }
    showMoreButton.innerHTML = message;
  }
})();
