$(function() { 

  
    checkAndUpdatePetInfoInHtml();

    // HW10 Part 2.1: console logging demos 
    runConsoleDemos();

    
    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);
    $('.rub-button').click(clickedBellyRubButton);

    // HW10 Part 2.2: buttons that make the browser log its own messages
    $('.debug-404-button').click(trigger404);
    $('.debug-typeerror-button').click(triggerTypeError);
    $('.debug-violation-button').click(triggerViolation);
    $('.debug-logs-button').click(runConsoleDemos);


  /*Added siblings() to allow it so only the most recent used button will be higlighted green, since siblings() retunrs every element that shares the same parent as the element that its called on, but excluding the element itself.  */

  $('.button-container button').click(function() {
    $(this).addClass('active').siblings().removeClass('active');

    var uses = ($(this).data('uses') ||0) +1;
  $(this).data('uses', uses);

  var total = 0;
  $('.button-container button').each(function() {
    total += $(this).data('uses') || 0;
  });
  $('.actions-count').text(total);

 
  console.log('[Niko] action button clicked:', $(this).text().trim(), '| total actions:', total);
  })

  
});

   
    var pet_info = {name:"Niko", weight: 30, happiness: 50};
    var MAX_HAPPINESS = 100;
    var SEAL_BONUS = 10; 

    function clickedTreatButton() {
      // Increase pet happiness
      // Increase pet weight
      pet_info.happiness += 5;
      pet_info.weight += 2;
      checkAndUpdatePetInfoInHtml();
      showPetMessage("Fish! Nom nom nom!");
      animatePet('hop');
    }

    function clickedPlayButton() {
      // Increase pet happiness
      // Decrease pet weight
      pet_info.happiness += 8;
      pet_info.weight -= 1;
      checkAndUpdatePetInfoInHtml();
      showPetMessage("Splash! Throw the ball!");
      animatePet('hop');
    }

    function clickedExerciseButton() {
      // Decrease pet happiness
      // Decrease pet weight
      pet_info.happiness -= 6;
      pet_info.weight -= 2;
      checkAndUpdatePetInfoInHtml();
      showPetMessage("So tired... need a nap.");
      animatePet('shake');
    }

   function clickedBellyRubButton() {
      // Increase pet happiness
      pet_info.happiness += 4;
      checkAndUpdatePetInfoInHtml();
      showPetMessage("Rub mah bellah!");
      animatePet('fade');
    }
    function checkAndUpdatePetInfoInHtml() {
      checkWeightAndHappinessBeforeUpdating();
      updatePetInfoInHtml();
    }

    function checkWeightAndHappinessBeforeUpdating() {
      
      if (pet_info.weight < 0) {
        pet_info.weight = 0;
      }
      if (pet_info.happiness < 0) {
        pet_info.happiness = 0;
      }
      if (pet_info.happiness > MAX_HAPPINESS) {
        pet_info.happiness = MAX_HAPPINESS;
      }
    }

    
    function updatePetInfoInHtml() {
      $('.name').text(pet_info['name']);
      $('.weight').text(pet_info['weight']);
      $('.happiness').text(pet_info['happiness']);
      $('.mood').text(getMood());
    }

    
    // HW10 Part 2.4: INTENTIONAL BUG 
    
    function getMood() {
      // = Number($('.happiness').text()); - Fix for bug below
      var happiness = $('.happiness').text();       
      var moodScore = happiness + SEAL_BONUS;       
      if (moodScore >= 100) {
        return "Overjoyed";
      } else if (moodScore >= 60) {
        return "Content";
      } else if (moodScore >= 30) {
        return "Bored";
      }
      return "Grumpy";
    }

    //notification for meesage with delayso rapid clicks dont overlap or stack up
  function showPetMessage(message) {
    $('.pet-message').stop(true,true).text(message).fadeIn(200).delay(2000).fadeOut(400);
  }

  //small animation for the pet image per what action clicked
  function animatePet(type) {
    var $img = $('.pet-image').stop(true,true);
    if (type === 'hop') {
      $img.animate({marginTop: '-20px'}, 120).animate({marginTop: '0px'}, 120);
    } else if (type === 'shake') {
      $img.animate({marginLeft: '-12px'}, 60).animate({marginLeft: '12px'}, 60).animate({marginLeft: '-12px'}, 60).animate({marginLeft: '0px'}, 60);
    }else{
      $img.fadeTo(300,0.5).fadeTo(300,1);
    }
  }

   
    // HW10 Part 2.1: Console message logging
    
    function runConsoleDemos() {
      // Log Info
      console.info('[Niko] Info: Giga Pet loaded for', pet_info.name);
      console.log('[Niko] Log: starting stats ->', pet_info);

      // Log Warning
      console.warn('[Niko] Warning: happiness is only', pet_info.happiness, 'out of', MAX_HAPPINESS);

      // Log Error 
      console.error('[Niko] Error: demo error message, nothing is actually broken');

      // Log Table 
      console.table([
        { button: 'Treat',     happiness: +5, weight: +2 },
        { button: 'Play',      happiness: +8, weight: -1 },
        { button: 'Exercise',  happiness: -6, weight: -2 },
        { button: 'Belly Rub', happiness: +4, weight:  0 }
      ]);

      // Log Group
      console.group('[Niko] Pet stats group');
      console.log('Name:', pet_info.name);
      console.log('Weight:', pet_info.weight, 'pounds');
      console.log('Happiness:', pet_info.happiness);
      console.groupEnd();

      // Log Custom (CSS-styled with %c)
      console.log(
        '%cNiko the Giga Pet',
        'color: white; background: #2f7d4f; font-size: 18px; font-weight: bold; padding: 4px 10px; border-radius: 6px;'
      );
    }

    
    // HW10 Part 2.2: Browser-logged messages
    

    // 404 Network Error
    function trigger404() {
      console.log('[Niko] Requesting a file that does not exist...');
      fetch('images/missing-toy.png');
    }

    // TypeError
    function triggerTypeError() {
      var toy;                         
      console.log(toy.name);           
    }

    // Performance Violation
    function triggerViolation() {
      var start = Date.now();
      while (Date.now() - start < 300) {
        
      }
    }
