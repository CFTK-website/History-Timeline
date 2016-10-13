$(function() {
    
    // These parameters can be modified
    
    yearCurrent = 1999;                                     // Sets the starting year for the timeline to display
    tickMark = 4;                                           // Change the marking interval of the ruler
    
    // Everything below should not be modified
    
    yearFirst = $('#ruler .year:nth-child(1) h1').text();   // Finds the first year in the timeline
    yearLast = $('#ruler .year:last-child h1').text();      // Finds the last year in the timeline  
    yearTotal = $('#ruler').children().length;              // Calculates the total number of years in the timeline
    yearIndex = yearCurrent - yearFirst + 1;                // Calculates the index of the current active year
    
    
    $('.year:nth-child(' + tickMark + 'n+1) h1').addClass('mark');              // Formats the ruler with the given tickMark
                
    showYear(yearCurrent);                                  // Initializes timeline
    
    $('.year').mouseenter(function() {            
        yearCurrent = $(this).children().text();            // Updates yearCurrent
        showYear(yearCurrent);                              // Updates timeline
    });
    
    $('#next').click(function() {
        if ( yearCurrent < yearLast ) {
            yearCurrent ++;                                 // Increments yearCurrent by +1
            showYear(yearCurrent);                          // Updates timeline
        };
    });
    
    $('#prev').click(function() {
        if ( yearCurrent > yearFirst ) {
            yearCurrent --;                                 // Increments yearCurrent by -1
            showYear(yearCurrent);                          // Updates timeline
        };
    });
    
    function showYear(year) {
        yearIndex = year - yearFirst + 1;
        var percentage = 100 * (yearIndex/yearTotal);       // Calculates the progress through the timeline    
        
        $('.yr').slideUp(150);                              // Hides all info blocks
        $('#' + year).slideDown(150);                       // Displays current year info block
        
        $('#controls h1').text(yearCurrent);                // Displays the correct year in the control bar
        
        $('#progress').animate({ 
            width: percentage + '%'                         // Animates the proper width for the progress bar
        }, 50, 'linear');  
        $('#progress p').text(yearIndex + '/' + yearTotal); // Displays page number in the progress bar
        
        $('.year').attr("id","");                                               // Clears all other .year class elements of the #focus
        $('#ruler .year:nth-child(' + yearIndex + ')').attr("id","focus");      // Adds the #focus id to the proper child in the ruler 
        
    }
        
})