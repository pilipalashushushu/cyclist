!function(n){n.fn.textyleF=function(t){var i=this,a=i.contents(),e=n.extend({duration:1e3,delay:150,easing:"ease",callback:null},t);return a.each(function(){var t=n(this);3===this.nodeType&&function(n){n.replaceWith(n.text().replace(/(\S)/g,"<span>$1</span>"))}(t)}),this.each(function(t){var a=i.children("span");i.css("opacity",1),a.css("display","inline-block"),a.each(function(t){n(this).delay(e.delay*t).queue(function(t){n(this).css({transform:"rotateY(0deg) rotateX(0deg)",opacity:1,transitionDuration:e.duration+"ms",transitionTimingFunction:e.easing}),t()}),"function"==typeof e.callback&&n(this).on("transitionend",function(){e.callback.call(this)})})})}}(jQuery);