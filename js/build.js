$(function() {
    
    listItem = $('#content_input').html(); // Grabs the list item template from the HTML document
    
    $('#b_right').click(function() {
        
        if ( $('#content_input').children().length > 1) {
            $('#content_input input:last-child').remove();                  // Removes a list item from the input list and changes focus
            $('#content_input input:last-child').focus();
        };
        
    });
    
    $('#b_left').click(function() {
        
        $('#content_input').append(listItem);                               // Adds a list item to the input list and changes focus
        $('#content_input input:last-child').focus();
        
    });
    
    $('#build_photo').blur(function() {
        
        var embedURL = $('#build_photo').val();                             
        var start = embedURL.indexOf('[img]') + 5;                          // Finds the two matching [img] and [/img] BBC markup
        var lengt = embedURL.indexOf('[/img]') - start;                     // Calculates the length of the URL within the embed code
        
        if ( start > 5 ) {
            $('#build_photo').val(embedURL.substr(start, lengt));           // If the provided input is a BBC embed then pull out the direct image URL
        }
        
        $('#img_preview').css('background-image',"url(" + $('#build_photo').val() + ")")    // Updates the preview's background image

    });
    
    $('#generate').click(function() {    
        
        if ( $('#build_year').val().length > 0 && $('#content_input input:nth-child(1)').val().length > 0 ) {
            
            var buildYear = $('#build_year').val();                         // Collects information from input field
            var imageURL = $('#build_photo').val();
            var flickrURL = $('#build_flickr').val();
            
            $('#build_preview').empty();
                                                                            // Generates a card with the given template
            
            $('#build_preview').append( '<div class="card yr" id="' + buildYear + '">\n\t<div class="img_container">\n\t\t<a href="' + flickrURL + '" target="_blank"></a>\n\t\t<img src="' + imageURL + '">\n\t</div>\n\t<h1>' + buildYear + '</h1>\n\t<ul>\n</ul>\n</div>' );
            
            if ( imageURL.length == 0) {                                     
                
                $('.card').addClass('nopics')                               // Checks if an image URL has been provided and if not adds the nopics class
                
            };
            
            $('.litem').each(function( index ) {
                $('.card ul').append( '\t\t<li>' + $(this).val() + '</li>\n' );   // Iterates through the list item inputs and properly add them to the card
            });
            
            $('.card ul').append('\t</ul>');
            
            $('#output').text($('#build_preview').html());                  // Pushes the plain HTML code to #output
            
         
            $('#output').each(function(i, block) {
                hljs.highlightBlock(block);                                 // Calls for highlight.js to prettify the code output dynamically
            });
            
            $('.hidden').show();                                            // Displays all hidden elements
            
        } else {
            
            alert('Required fields must be filled out!');
            
        };
        
    });
        
})

// [url=https://flic.kr/p/dh5P3h][img]https://c1.staticflickr.com/9/8031/8058283840_6010c3f9e4_k.jpg[/img][/url][url=https://flic.kr/p/dh5P3h]Untitled[/url] by [url=https://www.flickr.com/photos/carolinaftk/]Carolina For The Kids Foundation[/url], on Flickr