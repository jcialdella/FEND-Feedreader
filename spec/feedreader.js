/* feedreader.js
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* Tests are placed within the $() function,
 * since some of these tests may require DOM elements, to
 * ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This suite is all about the RSS feeds definitions,
   * the allFeeds variable in our application.
   */
  describe('RSS Feeds', () => {
    /* Test to make sure that the allFeeds variable has been
     * defined and that it is not empty.
     */
    it('are defined', () => {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* Test that loops through each feed in the allFeeds object
     * and ensures it has a URL defined and that the URL is not empty.
     */
    it('URL defined & not empty', () => {
      for (let feed of allFeeds) {
        expect(feed.url).toBeDefined();
        expect(feed.url.length).not.toBe(0);
      }
    });

    /* Test that loops through each feed in the allFeeds object
     * and ensures it has a name defined and that the name is not empty.
     */
    it('name defined & not empty', () => {
      for (let feed of allFeeds) {
        expect(feed.name).toBeDefined();
        expect(feed.name.length).not.toBe(0);
      }
    })

  });

  // This suite is about menu functionality
  describe('The menu', () => {
    // Test that ensures the menu element is hidden by default.
    it('element is hidden by default', () => {
      let c;
      c = document.querySelector('body');
      expect(c).toHaveClass('menu-hidden');
    })

    /* Test that ensures the menu changes visibility when the menu icon is clicked.
     * This test should have two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */
    it('changes visibility when clicked', () => {
      let hidn, notHidn;
      document.querySelector('.menu-icon-link').click();
      notHidn = document.querySelector('body');
      expect(notHidn).not.toHaveClass('menu-hidden');
      document.querySelector('.menu-icon-link').click();
      hidn = document.querySelector('body');
      expect(hidn).toHaveClass('menu-hidden');
    })

  });
  // This test suite is about initial entries upon load.
  describe('Initial Entries', () => {
    let e;
    /* Test that ensures when the loadFeed function is called and completes its work,
     * there is at least a single .entry element within the .feed container.
     */
    beforeEach((done) => {
      loadFeed(0, done);
    });

    it('at least a single .entry element', () => {
      e = document.querySelector('.feed');
      expect(e.childElementCount).toBeGreaterThan(0);
    });

  });
  // This test suite is about content changes when loading new feeds.
  describe('New Feed Selection', () => {
    let f0, f1;
    /* Test that ensures when a new feed is loaded by the loadFeed function
     * that the content actually changes.
     */
    beforeEach((done) => {
      loadFeed(0, () => {
        f0 = document.querySelector('.feed').innerHTML;
        loadFeed(1, () => {
          f1 = document.querySelector('.feed').innerHTML;
          done();
        });
      });
    });

    it('content changes', () => {
      expect(f0).not.toBe(f1);
    });

  });
}());
