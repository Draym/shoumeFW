/**
 * Created by kevin on 07/01/2017.
 */

/**
 * @ngdoc service
 * @name shoumeApp.history
 * @description
 * # history
 * Factory in the shoumeApp.
 */
angular.module('shoumeApp')
  .factory('History', function ($cookies, DateTools) {

    var moments = [];
    var recipes = [];
    var idMoments = "moments";
    var idRecipes = "recipes";
    var timeOut = 360;

    function initMomentsCookies() {
      var values = $cookies.get(idMoments);

      if (values != null) {
        var tab = JSON.parse(values);
        moments.length = 0;
        for (var i = 0; i < tab.length; ++i) {
          moments.push(tab[i]);
        }
      }
    }

    function saveMomentsCookies() {
      $cookies.put(idMoments, JSON.stringify(moments), {
        expires: DateTools.addMinutesToCurrentDate(timeOut)
      });
    }

    function initRecipesCookies() {
      var values = $cookies.get(idRecipes);

      if (values != null) {
        var tab = JSON.parse(values);
        recipes.length = 0;
        for (var i = 0; i < tab.length; ++i) {
          recipes.push(tab[i]);
        }
      }
    }

    function saveRecipesCookies() {
      $cookies.put(idRecipes, JSON.stringify(recipes), {
        expires: DateTools.addMinutesToCurrentDate(timeOut)
      });
    }

    function initMoments(values) {
      initMomentsCookies();
      if (moments.length == 0) {
        for (var i = 0; i < values.length; ++i) {
          moments.push(values[i].id);
        }
        saveMomentsCookies();
      }
    }

    function initRecipes(values) {
      initRecipesCookies();
      if (recipes.length == 0) {
        for (var i = 0; i < values.length; ++i) {
          recipes.push(values[i].id);
        }
        saveRecipesCookies();
      }
    }

    return {
      getMoment: function (id) {
        for (var i = 0; i < moments.length; ++i) {
          if (moments[i] == id) {
            return true;
          }
        }
        return false;
      },
      getRecipe: function (id) {
        for (var i = 0; i < recipes.length; ++i) {
          if (recipes[i] == id) {
            return true;
          }
        }
        return false;
      },
      initMoments: function (moments) {
        initMoments(moments);
      },
      initRecipes: function (recipes) {
        initRecipes(recipes);
      },
      addMoment: function (moment) {
        moments.push(moment.id);
        saveMomentsCookies();
      },
      addRecipe: function (recipe) {
        recipes.push(recipe.id);
        saveRecipesCookies();
      },
      clean: function() {
        $cookies.remove(idMoments);
        $cookies.remove(idRecipes);
      }
    };
  });
