module.exports = function (models) {
    'use strict';
    return {
        /**
         * Blog Index
         * @param req
         * @param res
         */
        home: function(req, res) {
            // models.Article.articlesForIndex()
            //     .then(function (articles) {
            //     },
            //     function (err) {
            //     });

                // models.Article.articlesForIndex()
                //     .then(function (articles) {
                //       res.render();
                //     },
                //     function (err) {
                //     });
                    models.Article.articlesForIndex()
                        .then(function (articles) {
                            res.render('blog_index', {articles: articles});
                        },
                        function (err) {
                            res.send(500);
                        });
        }
    };
};
