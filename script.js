const navLinks = document.querySelector('.nav-links');
const toTop = document.querySelector(".to-top");
const burger = document.querySelector('.burger');
const accordionItemHeaders = document.querySelectorAll(".accordion-item-header");

// navbar burger //
burger.addEventListener('click', function(){
  navLinks.classList.toggle('show');
  burger.classList.toggle('toggle');
});

activeslideimg();

        function activeslideimg(activeSlide = 2) {
            const slides = document.querySelectorAll(".slide");

            slides[activeSlide].classList.add("active");

            for (const slide of slides) {
                slide.addEventListener("click", () => {
                    clearActiveClasses();

                    slide.classList.add("active");
                });
            }


            function clearActiveClasses() {
                slides.forEach((slide) => {
                    slide.classList.remove("active");
                })
            }


        }
        
        const carousel = document.querySelector(".carousel"),
        firstImg = carousel.querySelectorAll("img")[0],
        arrowIcons = document.querySelectorAll(".wrapper i");
        
        let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;
        
        const showHideIcons = () => {
            // showing and hiding prev/next icon according to carousel scroll left value
            let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
            arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
            arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
        }
        
        arrowIcons.forEach(icon => {
            icon.addEventListener("click", () => {
                let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
                // if clicked icon is left, reduce width value from the carousel scroll left else add to it
                carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
                setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
            });
        });
        
        const autoSlide = () => {
            // if there is no image left to scroll then return from here
            if(carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;
        
            positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
            let firstImgWidth = firstImg.clientWidth + 14;
            // getting difference value that needs to add or reduce from carousel left to take middle img center
            let valDifference = firstImgWidth - positionDiff;
        
            if(carousel.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
                return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
            }
            // if user is scrolling to the left
            carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
        }
        
        const dragStart = (e) => {
            // updatating global variables value on mouse down event
            isDragStart = true;
            prevPageX = e.pageX || e.touches[0].pageX;
            prevScrollLeft = carousel.scrollLeft;
        }
        
        const dragging = (e) => {
            // scrolling images/carousel to left according to mouse pointer
            if(!isDragStart) return;
            e.preventDefault();
            isDragging = true;
            carousel.classList.add("dragging");
            positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
            carousel.scrollLeft = prevScrollLeft - positionDiff;
            showHideIcons();
        }
        
        const dragStop = () => {
            isDragStart = false;
            carousel.classList.remove("dragging");
        
            if(!isDragging) return;
            isDragging = false;
            autoSlide();
        }
        
        carousel.addEventListener("mousedown", dragStart);
        carousel.addEventListener("touchstart", dragStart);
        
        document.addEventListener("mousemove", dragging);
        carousel.addEventListener("touchmove", dragging);
        
        document.addEventListener("mouseup", dragStop);
        carousel.addEventListener("touchend", dragStop);
  
        
        //slide 3d foto
        function shiftLeft() {
            const boxes = document.querySelectorAll(".box");
            const tmpNode = boxes[0];
            boxes[0].className = "box move-out-from-left";
        
            setTimeout(function() {
                if (boxes.length > 5) {
                    tmpNode.classList.add("box--hide");
                    boxes[5].className = "box move-to-position5-from-left";
                }
                boxes[1].className = "box move-to-position1-from-left";
                boxes[2].className = "box move-to-position2-from-left";
                boxes[3].className = "box move-to-position3-from-left";
                boxes[4].className = "box move-to-position4-from-left";
                boxes[0].remove();
        
                document.querySelector(".cards__container").appendChild(tmpNode);
        
            }, 500);
        
        }
        
        function shiftRight() {
            const boxes = document.querySelectorAll(".box");
            boxes[4].className = "box move-out-from-right";
            setTimeout(function() {
                const noOfCards = boxes.length;
                if (noOfCards > 4) {
                    boxes[4].className = "box box--hide";
                }
        
                const tmpNode = boxes[noOfCards - 1];
                tmpNode.classList.remove("box--hide");
                boxes[noOfCards - 1].remove();
                let parentObj = document.querySelector(".cards__container");
                parentObj.insertBefore(tmpNode, parentObj.firstChild);
                tmpNode.className = "box move-to-position1-from-right";
                boxes[0].className = "box move-to-position2-from-right";
                boxes[1].className = "box move-to-position3-from-right";
                boxes[2].className = "box move-to-position4-from-right";
                boxes[3].className = "box move-to-position5-from-right";
            }, 500);
        
        }



 //accordion
const accordionItemHeader = document.querySelectorAll(".accordion-item-header");

accordionItemHeaders.forEach(accordionItemHeader => {
  accordionItemHeader.addEventListener("click", event => {
    
    // Uncomment in case you only want to allow for the display of only one collapsed item at a time!
    
    // const currentlyActiveAccordionItemHeader = document.querySelector(".accordion-item-header.active");
    // if(currentlyActiveAccordionItemHeader && currentlyActiveAccordionItemHeader!==accordionItemHeader) {
    //   currentlyActiveAccordionItemHeader.classList.toggle("active");
    //   currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
    // }

    accordionItemHeader.classList.toggle("active");
    const accordionItemBody = accordionItemHeader.nextElementSibling;
    if(accordionItemHeader.classList.contains("active")) {
      accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
    }
    else {
      accordionItemBody.style.maxHeight = 0;
    }
    
  });
});


