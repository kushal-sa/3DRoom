/*
	Room object = {
	
	b:b,
	l:l,
	h:h,
	rot:0,
	origin:[0,0],
	con_X:[],
	con_Y:[],
	door:[{face,to,dir,min,max}],

	}




*/	

	var rooms=[]; // used to store info about each room
	var no =0;
    var space;
    var wide=20;

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

		space.append("<div class='map'></div>");



		createRoom("100px","100px","100px");

	}

	function createRoom(b,l,h){

		/*
			dimension=[b,l,h]
			front=back=b*h left=right=l*h top=bottom=l*h
			

		*/

		//Added a new room to the space DOM

		$("<div></div>").css({

		  "transform-style":"preserve-3d",
          "transform":"translate(0px)",
          "height":"100px",
          "width":"100px",
          "position":"absolute",
          "background-color":"red",
          "opacity":"0.5",
          "transform-origin":"0% 0%"


		}).addClass("room"+no).appendTo(".map");

		$(".map").css({"transform":"translateZ(1100px)"});


       
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
            "transform":"translateZ(-"+l+")"

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

			$("room"+no+" >.map").append(sides[name]);
		}

		room[no]={};

		room[no].b=b;	room[no].l=l;	room[no].h=h;


		room[no].rot=0; room[no].origin.x=0; room[no].origin.y=0;

		room[no].con_X=[]; room[no].con_Y=[]; room[no].door=[];

		no++;

	} 

	//end of createRoom


	function attach(which,to_room,to_face){

		//if else ladder for right front bottom

		room[which].origin.x=room[to_room].origin.x;
		room[which].origin.y=room[to_room].origin.y;
		room[which].rot=room[to_room].rot;

		var deg=room[which].rot*Math.PI/180,
			b=room[to_room].b,
			l=room[to_room].l;


		if(to_face==="right")
			{
				room[which].origin.x+=(b*Math.cos(deg) + l*Math.sin(deg));
				room[which].origin.y+=(b*Math.sin(deg) - l*Math.cos(deg));
				room[which].rot+=90;
			}
		else if(to_face==="front")
			{
				room[which].origin.x+=(b*Math.cos(deg));
				room[which].origin.y+=(b*Math.sin(deg));
				rot+=180;

			}
		else if(to_face==="back")
			{
				room[which].origin.y+=(-l*Math.cos(deg));
				room[which].origin.x+=(l*Math.sin(deg));

			}
		else if(to_face==="left"){

			room[which]-=90;
		}

		//Update the DOM element
		$("."+which).css({"transform":"translate3d("+room[which].origin.x+",0,"+room[which].origin.y+") rotateY("+room[which].rot+")"});
		
	}

	// End of attach()

	function offset(room,pts){

		$("."+room).css({"transform":$("."+room).css("transform")+"translateX("+pts+"px)"});
	}

	//offset() ends


	function constgen(room){

		var deg=room[room].rot*Math.PI/180;

		if(Math.cos(deg)===1){

			room.con_X[0]=room.origin.x;
			room.con_X[1]=room.origin.x+room.b;
			room.con_Y[0]=room.origin.y;
			room.con_Y[1]=room.origin.y+room.l;			
		}

		else if(Math.sin(deg)===1){

			room.con_X[0]=room.origin.x;
			room.con_X[1]=room.origin.x+room.l;
			room.con_Y[1]=room.origin.y-room.b;
			room.con_Y[0]=room.origin.y;			
		}

		else if(Math.cos(deg)===-1){

			room.con_X[1]=room.origin.x;
			room.con_X[0]=room.origin.x-room.b;
			room.con_Y[0]=room.origin.y-room.l;
			room.con_Y[1]=room.origin.y;			
		}

		else if(Math.sin(deg)===-1){

			room.con_X[1]=room.origin.x;
			room.con_X[0]=room.origin.x-room.l;
			room.con_Y[0]=room.origin.y;
			room.con_Y[1]=room.origin.y+room.b;			
		}							



	}

	//End of constgen()


function constraint(rooms){

	for(var i=0;i<roonsoms.length;i++){

		constgen(rooms[i]);
	}

}

//End of constraints

function makeDoor(room,face,pos,to){


	//Always use length for doors on left and right
	//Use breadth for door for door in front and back
	var deg=room[room].rot*Math.PI/180;

	var temp={};

	room[room].push(temp);

	temp["face"]=face;temp["to"]=to;
	

	if(face==="front"){

		if(Math.cos(deg)===1){

			temp.dir="z";

			temp.min=room[room].origin.x+pos;
			temp.max=temp.max+wide;			

		}
		if(Math.cos(deg)===-1){

			temp.dir="-z";

			temp.max=room[room].origin.x-pos;
			temp.min=temp.max-wide;			
			
		}
		if(Math.sin(deg)===1){

			temp.dir="-x";

			temp.min=room[room].origin.y+pos;
			temp.max=temp.max+wide;			
			
		}
		if(Math.sin(deg)===-1){

			temp.dir="x";

			temp.max=room[room].origin.y-pos;
			temp.min=temp.max-wide;			
			
		}						
		
	}

	else if(face==="back"){

		if(Math.cos(deg)===1){

			temp.dir="-z";

			temp.min=room[room].origin.x+pos;
			temp.max=temp.max+wide;			

		}
		if(Math.cos(deg)===-1){

			temp.dir="z";

			temp.max=room[room].origin.x-pos;
			temp.min=temp.max-wide;			
			
		}
		if(Math.sin(deg)===1){

			temp.dir="x";

			temp.min=room[room].origin.y+pos;
			temp.max=temp.max+wide;			
			
		}
		if(Math.sin(deg)===-1){

			temp.dir="-x";

			temp.max=room[room].origin.y-pos;
			temp.min=temp.max-wide;			
			
		}						
		
	}

	else if(face==="left"){

		if(Math.cos(deg)===1){

			temp.dir="x";

			temp.max=room[room].origin.y-pos;
			temp.min=temp.max-wide;			

		}
		if(Math.cos(deg)===-1){

			temp.dir="-x";

			temp.min=room[room].origin.y+pos;
			temp.max=temp.max+wide;			
			
		}
		if(Math.sin(deg)===1){

			temp.dir="z";

			temp.min=room[room].origin.x+pos;
			temp.max=temp.max+wide;			
			
		}
		if(Math.sin(deg)===-1){

			temp.dir="-z";

			temp.min=room[room].origin.x-pos;
			temp.min=temp.max-wide;			
			
		}						
		
	}

	else if(face==="left"){

		if(Math.cos(deg)===1){

			temp.dir="-x";

			temp.max=room[room].origin.y-pos;
			temp.min=temp.max-wide;			

		}
		if(Math.cos(deg)===-1){

			temp.dir="x";

			temp.min=room[room].origin.y+pos;
			temp.max=temp.max+wide;			
			
		}
		if(Math.sin(deg)===1){

			temp.dir="-z";

			temp.min=room[room].origin.x+pos;
			temp.max=temp.max+wide;			
			
		}
		if(Math.sin(deg)===-1){

			temp.dir="z";

			temp.min=room[room].origin.x-pos;
			temp.min=temp.max-wide;			
			
		}						
		
	}			


}

init();

createRoom("100px","100px","100px");
attach("room1","room0","right");

/*


	(Deprecated Idea)
	Extract Origin Using Matrix after neccessary transformations for
	the rooms.
	(New Idea)
	Kepp track of Origin through custom functions.

	consgen() remain same for generating room size constarints.
	(Changes done to conditions)
 
	makeDoor() can be implements owing to the fact that bothe front and
	left share the rooms origin. So no need for changing knowing their
	origin. Simply set the door as per the rules.

	For left and back we use the same procesdure used to set the doors for
	right and back respectively but simply change the direction of the
	passage.
	
	As per the Rules:

	X*sin Y*cos || Y*sin X*cos --to find out the direction

	

*/