/*
 * jQuery.appear
 * https://github.com/bas2k/jquery.appear/
 * http://code.google.com/p/jquery-appear/
 * http://bas2k.ru/
 *
 * Copyright (c) 2009 Michael Hixson
 * Copyright (c) 2012-2014 Alexander Brovikov
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 */
(function($) {
  $.fn.appear = function(fn, options) {

    const settings = $.extend({

      // arbitrary data to pass to fn
      data: undefined,

      // call fn only on the first appear?
      one: true,

      // X & Y accuracy
      accX: 0,
      accY: 0,

    }, options);

    return this.each(function() {

      const t = $(this);

      // whether the element is currently visible
      t.appeared = false;

      if (!fn) {

        // trigger the custom event
        t.trigger('appear', settings.data);
        return;
      }

      const w = $(window);

      // fires the appear event when appropriate
      const check = function() {

        // is the element hidden?
        if (!t.is(':visible')) {

          // it became hidden
          t.appeared = false;
          return;
        }

        // is the element inside the visible window?
        const a = w.scrollLeft();
        const b = w.scrollTop();
        const o = t.offset();
        const x = o.left;
        const y = o.top;

        const ax = settings.accX;
        const ay = settings.accY;
        const th = t.height();
        const wh = w.height();
        const tw = t.width();
        const ww = w.width();

        if (y + th + ay >= b &&
                    y <= b + wh + ay &&
                    x + tw + ax >= a &&
                    x <= a + ww + ax) {

          // trigger the custom event
          if (!t.appeared) t.trigger('appear', settings.data);

        } else {

          // it scrolled out of view
          t.appeared = false;
        }
      };

      // create a modified fn with some additional logic
      const modifiedFn = function() {

        // mark the element as visible
        t.appeared = true;

        // is this supposed to happen only once?
        if (settings.one) {

          // remove the check
          w.unbind('scroll', check);
          const i = $.inArray(check, $.fn.appear.checks);
          if (i >= 0) $.fn.appear.checks.splice(i, 1);
        }

        // trigger the original fn
        fn.apply(this, arguments);
      };

      // bind the modified fn to the element
      if (settings.one) t.one('appear', settings.data, modifiedFn);
      else t.bind('appear', settings.data, modifiedFn);

      // check whenever the window scrolls
      w.scroll(check);

      // check whenever the dom changes
      $.fn.appear.checks.push(check);

      // check now
      (check)();
    });
  };

  // keep a queue of appearance checks
  $.extend($.fn.appear, {

    checks: [],
    timeout: null,

    // process the queue
    checkAll() {
      let length = $.fn.appear.checks.length;
      if (length > 0) while (length--) ($.fn.appear.checks[length])();
    },

    // check the queue asynchronously
    run() {
      if ($.fn.appear.timeout) clearTimeout($.fn.appear.timeout);
      $.fn.appear.timeout = setTimeout($.fn.appear.checkAll, 20);
    },
  });

  // run checks when these methods are called
  $.each([ 'append', 'prepend', 'after', 'before', 'attr',
    'removeAttr', 'addClass', 'removeClass', 'toggleClass',
    'remove', 'css', 'show', 'hide' ], function(i, n) {
    const old = $.fn[n];
    if (old) {
      $.fn[n] = function() {
        const r = old.apply(this, arguments);
        $.fn.appear.run();
        return r;
      };
    }
  });

})(jQuery);
