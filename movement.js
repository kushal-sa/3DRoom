/*
How we CAN MOVE.

	1.Nullify the previous rotation.
	2.Translate based on the calculations carried out using the previous rotation.
	3.Transfer the origin to your current location based on step 2.
	4.Restore the rotation.

How we WILL MOVE.

	1.We will use only translate3d(x,0,z) rotateY(0deg) rotate3d(x,0,y,0deg).
	2.When the map is created there is NO TRANSLATION and NO ROTATION and our container is at z=0.
	3.As we give instructions to move the map is moved so as to give the relative movement.
	4.After each movement instruction the MOVEMENT takes place relative to the this given initial position.

	
	TRANSLATION:
	1.When translation action is trigerred, the distance to be covered along X-axis and Z-axis are calculated based on path distance to cover and the current angle that Z-axis makes with our viewing angle i.e the TURNING variable, and is added to the previous value of the translation taken place till then.
	2.Now the new Origin is calculated using this new position that we will assume after translation.
	3.Now we update the transform-origin with the newly calculated origin.
	4.Lastly we update the transform:translate3d() rotateY() rotate3d(); in the given order with newly calculated translation property while keeping the rotation properties the same.
	
	TURNING (RotateY())
	1.When the turning instruction are given, the rotationY variable is updated based on the given input and the stored value of the variable is updated by adding to it this new value.
	2.New Up and Down variable is calculated and the new axis for Rotate3d is calculated
	3.Lastly we update the transform:translate3d() rotateY() rotate3d(); in the given order with newly calculated rotateY property while keeping the other properties the same.
	
	UP and DOWN VIEW (Rotate3d())
	1.When the viewing changes, the rotate3d variable is calulated and stored.
	2.Lastly we update the transform:translate3d() rotateY() rotate3d(); in the given order with newly calculated rotate3D property while keeping the other properties the same.
	
	
	
*/

	
	//CLOSURE TO HIDE DATA AND ONLY PROVIDING RESULTS.
	
		
		console.log("height:"+$(document).height());
		console.log("width:"+$(document).width());

		var cur=0;
		
		
var variable={
				
					'translate':{x:0,y:0,z:0},
					'turn':0,
					'origin':{x:100,y:100,z:1000},
					'perspective':1000,
					'rot3d':0,
					
					};
				
				var pagex,pagey;
				

				
				
				$(window).keypress(move);
				$(document).one('mousemove',function(e){
				
					console.log("x:"+e.pageX);
					console.log("y:"+e.pageY);
					pagex=e.pageX;
					pagey=e.pageY;
					
					$(document).on('mousemove',turn_m);
				
				});
				
				
				
									function update(){
					
						console.log("Inside Update");
						
						var op1=(variable.origin.x)+"px "+(variable.origin.y)+"px "+(variable.origin.z)+"px";
						var op2="translate3d("+variable.translate.x+"px,"+variable.translate.y+"px,"+variable.translate.z+"px) rotate3d("+(Math.abs(Math.cos(variable.turn*3.14/180)))+",0,"+Math.abs((Math.sin(variable.turn*3.14/180)))+","+variable.rot3d+"deg)  rotateY("+variable.turn+"deg)";
					
						$('#cont').css({'transform-origin':op1,'transform':op2});
					
					
						console.log("origin_x:"+variable.origin.x+"  origin_y:"+variable.origin.y+"origin_z:"+variable.origin.z);
						console.log("translate_x:"+variable.translate.x+"  origin_y:"+variable.translate.y+"origin_z:"+variable.translate.z);
						console.log("translate_z:"+variable.translate.z);
						console.log("rot3d:"+variable.rot3d);
						console.log("turn:"+variable.turn);
						console.log();
					
					
					}
					
				/*	function turn_m(e){
						
						
						if(Math.abs(e.pageX-pagex)>=Math.abs(e.pageY-pagey)){
						
							if(e.pageX!==pagex){
						
							variable.turn+=(e.pageX>pagex?1:-1);
						
							}
						
						}
						
						else{
						
							if(e.pageY!=pagey){
						
							variable.rot3d+=(e.pageY>pagey?-0.1:0.1);
						
							}
						
						
						}

						

						
						
						update();
						pagex=e.pageX;
						pagey=e.pageY;
					
					}*/
				

				
				function move(e){
				
					console.log("Inside Move");
					
					
					
					var fwd=10,
						side=10;
					

				
					switch(e.which){
					
						case 119://w
						case 115:forward();break;//s
						case 97://a
						case 100:sideway();break;//d
					
					}
					
					
					function forward(){
					
						console.log("Inside Forward");
						//Translating position
					
						var checkx;var checkz;
					
						checkx=variable.translate.x+((e.which===119?-fwd:fwd)*Math.sin(variable.turn*3.14/180));
						checkz=variable.translate.z+((e.which===119?fwd:-fwd)*Math.cos(variable.turn*3.14/180));
						
						//Translating origin

						if(checkmove(checkx,checkz)){

							variable.translate.x=checkx;
							variable.translate.z=checkz;

							variable.origin.x+=((e.which===119?fwd:-fwd)*Math.sin(variable.turn*3.14/180));
							variable.origin.z-=((e.which===119?fwd:-fwd)*Math.cos(variable.turn*3.14/180));						
							console.log(variable.turn);
							
							update();							


						}
						

					}
				
					function sideway(){
					
						var checkx,checkz;
					
						console.log("Inside Turn");
					
						checkx=variable.translate.x-((e.which===97?-fwd:fwd)*Math.cos(variable.turn*3.14/180));
						checkz=variable.translate.z=((e.which===97?fwd:-fwd)*Math.sin(variable.turn*3.14/180));
						
						//Translating origin

						if(checkmove(checkx,checkz)){

							variable.translate.x=checkx;
							variable.translate.z=checkz;

							variable.origin.x-=((e.which===97?fwd:-fwd)*Math.cos(variable.turn*3.14/180));
							variable.origin.z-=((e.which===97?fwd:-fwd)*Math.sin(variable.turn*3.14/180));						
							console.log(variable.turn);
							
							update();


						}
						

					}
				
				

				}
				
					var doc_h=$(document).height(),doc_w=$(document).width();
					var tch=$(document).height()/2,tcw=$(document).width()/2;
	var heg=180/doc_h,weg=720/doc_w;
	
	$(window).resize(function(){
	
		doc_h=$(document).height();
		doc_w=$(document).width();
		tch=$(document).height()/2,tcw=$(document).width()/2;
		heg=180/doc_h,weg=720/doc_w;
	
	})
	
function turn_m(e){
						
						
						if(Math.abs(e.pageX-pagex)>=Math.abs(e.pageY-pagey)){
						
							if(e.pageX!==pagex){
						
							variable.turn=((e.pageX-tcw)*weg);
						
							}
						
						}
						
						else{
						
							if(e.pageY!=pagey){
						
							variable.rot3d=((tch-e.pageY)*heg);
						
							}}
							


						
						
						update();
						pagex=e.pageX;
						pagey=e.pageY;
					
					}
		

		function checkmove(tox,toz){

			var croom=room[cur];

			if(tox>croom.con_X[1]){

				return doorcheck(tox,"x",croom);

			}
			else if(tox<croom.con_X[0]){

				return doorcheck(tox,"-x",croom);
			}
				
			if(toz>croom.con_Y[1]){

				return doorcheck(toz,"z",croom);
			}
			else if(toz<croom.con_Y[0]){

				return doorcheck(toz,"-z",croom);
			}

			return true;	

			function doorcheck(pos,dir,croom){

				for(var i=0;i<croom.door.length;i++){

					if(croom.door[i].dir===dir){

						if(pos<croom.door[i].max && pos>croom.door[i].min){

							cur=croom.door.[i].to;
							return true;
						}

					}
				}

				return false;

			}	
		}
		