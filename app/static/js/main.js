(function() {

  const select = (el, all = false) => {
    el = el.trim();
    return all ? [ ...document.querySelectorAll(el) ] : document.querySelector(el);
  };

  const on = (type, el, listener, all = false) => {
    const selectEl = select(el, all);
    if (selectEl) {
      all ?
      selectEl.forEach(e => e.addEventListener(type, listener)) :
      selectEl.addEventListener(type, listener);
    }
  };

  const scrollto = el => window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  // on('click', '.mobile-nav-toggle', function(e) {
  on('click', '.mobile-nav-toggle', e => {
    select('#navbar').classList.toggle('navbar-mobile');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });

  // on('click', '#navbar .nav-link', function(e) {
  on('click', '#navbar .nav-link', e => {
    const section = select(this.hash);
    if (section) {
      e.preventDefault();

      const navbar = select('#navbar'),
            header = select('#header'),
            sections = select('section', true),
            navlinks = select('#navbar .nav-link', true);

      navlinks.forEach(item => item.classList.remove('active'));

      this.classList.add('active');

      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile');
        const navbarToggle = select('.mobile-nav-toggle');
        navbarToggle.classList.toggle('bi-list');
        navbarToggle.classList.toggle('bi-x');
      }

      if (this.hash == '#header') {
        header.classList.remove('header-top');
        sections.forEach(item => item.classList.remove('section-show'));
        return;
      }

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top');
        setTimeout(function() {
          sections.forEach(item => item.classList.remove('section-show'));
          section.classList.add('section-show');
        }, 350);
      } else {
        sections.forEach(item => item.classList.remove('section-show'));
        section.classList.add('section-show');
      }

      scrollto(this.hash);

    }
  }, true);

  window.addEventListener('load', () => {
    if (window.location.hash) {
      const initial_nav = select(window.location.hash);
      if (initial_nav) {
        const header = select('#header');
        const navlinks = select('#navbar .nav-link', true);

        console.log(navlinks);

        header.classList.add('header-top');

        navlinks.forEach(item =>
          (item.getAttribute('href') == window.location.hash) ?
          item.classList.add('active') :
          item.classList.remove('active')
        );

        setTimeout(function() {
          initial_nav.classList.add('section-show');
        }, 350);

        scrollto(window.location.hash);
      }
    }
  });

  const skillsContent = select('.skills-content');
  if (skillsContent) {
    new Waypoint({
      element: skillsContent,
      offset: '80%',
      handler: function(direction) {
        const progress = select('.progress .progress-bar', true);
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  }

  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      },
    }
  });

  window.addEventListener('load', () => {
    const porfolioContainer = select('.portfolio-container'),
          portfolioFilters = select('#portfolio-filters li', true);

    if (porfolioContainer) {
      const portfolioIsotope = new Isotope(porfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });
      on('click', '#portfolio-filters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(el => el.classList.remove('filter-active'));
        this.classList.add('filter-active');
        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }
  });

  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

})()