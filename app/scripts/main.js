const Home = new Vue({
  el: '#home',
  data: {
    windowHeight: 0,
    mobileMenuOpened: false,
    homeSliderInterval: null,
    photoIndex: 0,
    photos: [
      { url: 'unsplash/uo-stcdueq0-thomas-claeys.jpg', title: 'In the woods' },
      { url: 'unsplash/2fgvaqx-fxs-oskar-krawczyk.jpg', title: 'On the streets'},
      { url: 'unsplash/x7x7oi4o4xe-ales-krivec.jpg', title: 'By the lakes' },
      { url: 'unsplash/26-lap0xprm-dustin-scarpitti.jpg', title: 'Everywhere' },
    ]
  },
  computed: {
    activePhoto () {
      return this.photos[this.photoIndex]
    },
    photoUrl () {
      return { 'background-image': `url(images/${this.photos[this.photoIndex].url})` }
    },
    homeStyle () {
      return this.windowHeight ? { height: `${this.windowHeight}px` } : {}
    }
  },
  methods: {
    openMobileMenu () {
      this.mobileMenuOpened = true
    },
    closeMobileMenu () {
      this.mobileMenuOpened = false
    },
    toggleMobileMenu () {
      this.mobileMenuOpened = !this.mobileMenuOpened
    },
    handleInterval () {
      const windowWidth = window.innerWidth

      if (windowWidth < 600 && !this.homeSliderInterval) {
        this.homeSliderInterval = setInterval(this.slideRight, 5000)
        window.addEventListener('click', this.closeMobileMenu)
      } else if (windowWidth >= 600 && this.homeSliderInterval) {
        clearInterval(this.homeSliderInterval)
        this.homeSliderInterval = null
        this.closeMobileMenu()
        window.removeEventListener('click', this.closeMobileMenu)
      }
    },
    slideLeft () {
      this.photoIndex === 0
        ? this.photoIndex = this.photos.length - 1
        : this.photoIndex--
    },
    slideRight () {
      this.photoIndex === this.photos.length - 1
        ? this.photoIndex = 0
        : this.photoIndex++
    }
  },
  mounted () {
    this.windowHeight = window.innerHeight
    this.handleInterval()
    window.addEventListener('resize', this.handleInterval)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleInterval)
  }
})

const Thoughts = new Vue({
  el: '#thoughts',
  data: {
    direction: 'right',
    index: 0,
    items: [
      {
        title: 'Here\'s some insight about how I set up my working space',
        date: 'December 12th, 2016',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat.'
      },
      {
        title: 'Here\'s another one of my blog posts',
        date: 'December 23th, 2016',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
      },
      {
        title: 'Here\'s some lorem ipsum',
        date: 'January 9th, 2017',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse. Excepteur sint occaecat cupidatat.'
      },
      {
        title: 'And some dolor sit amet',
        date: 'January 18th, 2017',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat.'
      }
    ]
  },
  computed: {
    enterClass () {
      return `animated fadeIn${this.direction === 'left' ? 'Right' : 'Left'}`
    },
    leaveClass () {
      return `animated fadeOut${this.direction === 'left' ? 'Left' : 'Right'}`
    }
  },
  methods: {
    slideLeft () {
      this.direction = 'left'
      this.index <= 0
        ? this.index = this.items.length - 2
        : this.index -= 2
    },
    slideRight () {
      this.direction = 'right'
      this.index >= this.items.length - 2
        ? this.index = 0
        : this.index +=2
    }
  },
  mounted () {
    const hammertime = new Hammer(this.$el)

    hammertime.on('swipe', e => {
      if (e.deltaX < 0) this.slideLeft()
      if (e.deltaX > 0) this.slideRight()
    })
  }
})

const Shop = new Vue({
  el: '#shop',
  data: {
    itemsHeight: 0,
    initialized: false,
    currentMediaQuery: null,
    direction: 'right',
    index: 0
  },
  computed: {
    itemsWrapperStyle () {
      return this.itemsHeight ? { height: `${this.itemsHeight}px`} : {}
    },
    enterClass () {
      return `animated fadeIn${this.direction === 'left' ? 'Right' : 'Left'}`
    },
    leaveClass () {
      return `animated fadeOut${this.direction === 'left' ? 'Left' : 'Right'}`
    }
  },
  watch: {
    index (next, prev) {
      this.direction = next < prev ? 'left' : 'right'
    }
  },
  methods: {
    windowResize: _.debounce(
      function () {
        this.calculateHeight()
      },
      200
    ),
    calculateHeight () {
      this.itemsHeight = this.$refs.items.clientHeight
    },
    slideLeft () {
      this.index--
    },
    slideRight () {
      this.index++
    }
  },
  mounted () {
    this.calculateHeight()
    window.addEventListener('resize', this.windowResize)
    this.initialized = true

    const hammertime = new Hammer(this.$el)

    hammertime.on('swipe', e => {
      if (e.deltaX < 0) this.slideLeft()
      if (e.deltaX > 0) this.slideRight()
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.windowResize)
  }
})
