	var rooms=[];
	var no =0;
    var space;

	function init(){



		 space=$("<div class='space'></div>").css({

			"margin":"auto",
			"perspective":"1000px",
			"perspective-origin":"50% 50%",
			"position":"absolute",
			"height":"500px",
			"width":"500px"

		});

		$("body").append(space);



		createRoom("100px","100px","100px");

	}

	function createRoom(b,l,h){

		/*
			dimension=[b,l,h]
			front=back=b*h left=right=l*h top=bottom=l*h
			

		*/
		rooms[no]=$("<div></div>").css({

			"transform-style":"preserve-3d",
          "transform":"translate(0px)",
          "height":"100px",
          "width":"100px",
          "position":"absolute",
          "background-color":"red",
          "opacity":"0.5",
          "transform-origin":"0% 0%"

		}).appendTo(space);


        console.log(no);
		var parent=rooms[no];
        console.log(parent);
        parent.addClass("room"+no);
		var side_name=["front","back","left","right","top","bottom"];

		var sides={};

		for(var i=0;i<6;i++){

			sides[side_name[i]]=$("<div></div>",{"class":side_name[i]}).css({

				"transform-style":"preserve-3d",
				"position":"absolute",
				"transform-origin":"0% 0%"
			});
		}

		sides.front.css({

			"height":h,
			"width":b

		})	;

		sides.back.css({

			"height":h,
			"width":b,
            "transform":"translateZ("+l+")"

		})	;

		sides.left.css({

			"height":h,
			"width":l,
			"transform":"rotateY(-90deg)"

		})	;

		sides.right.css({

			"height":h,
			"width":l,
			"transform-origin":"0% 0%",
			"transform":"rotateY(-90deg) translateZ(-"+b+")",
	        "background-color":"green",
	        "opacity":"0.5"

		})	;

		sides.top.css({

			"height":l,
			"width":b,
			"transform":"rotateX(90deg)"

		})	;

		sides.bottom.css({

			"height":l,
			"width":b,
			"transform":"rotateX(90deg) translateZ(-"+h+")"

		})	;	


		for(var name in sides){

			parent.append(sides[name]);
		}		

		no++;

	} //end of createRoom

	function attach(which,to_room,to_face){

		//if else ladder for right front bottom

		if(to_face==="right")
			{
				$("."+which).css({"transform":$("."+to_room).css("transform")+$("."+to_room+" >.back").css("transform")+$("."+to_room+" >."+to_face).css("transform")+"rotateY(180deg)"});

			}
		else if(to_face==="front")
			{
				$("."+which).css({"transform":$("."+to_room).css("transform")+$("."+to_room+" >.right").css("transform")+"rotateY(-90deg)"});

			}
		else if(to_face==="bottom")
			{
				$("."+which).css({"transform":$("."+to_room).css("transform")+$("."+to_room+" >.back").css("transform")+$("."+to_room+" >."+to_face).css("transform")+"rotateX(180deg)"});

			}
		else
		//this suffice for left top back
		$("."+which).css({"transform":$("."+to_room).css("transform")+$("."+to_room+" >."+to_face).css("transform")});

	}

	function offset(room,pts){

		$("."+room).css({"transform":$("."+room).css("transform")+"translateX("+pts+"px)"});
	}

init();

createRoom("100px","100px","100px");
attach("room1","room0","right");