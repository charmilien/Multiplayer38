class Game {
  constructor(){}

  getState(){
    database.ref('gameState').on("value",function(data){ gameState = data.val(); })

  }

  update(state){
    database.ref('/').update({ gameState: state });
  }

  async start()
  {
    car1=createSprite(200,displayHeight-100,80,100)
    car2=createSprite(400,displayHeight-100,80,100)
    car3=createSprite(600,displayHeight-100,80,100)
    car4=createSprite(800,displayHeight-100,80,100)
    cars=[car1,car2,car3,car4]

        if(gameState === 0)
        {
          player = new Player();
          var playerCountRef = await database.ref('playerCount').once("value");
          if(playerCountRef.exists())
          {
            playerCount = playerCountRef.val();
            player.getCount();
          }
          form = new Form()
          form.display();  
        }
  }

  play()
  {

    form.greeting.hide();
    Player.getPlayerInfo();
    

    if(allPlayers !== undefined)
    {
      var index=1; var x=0; var y=0;

          for(var plr in allPlayers)
          {
              x=x+200; 
              y=displayHeight-allPlayers[plr].distance;
              cars[index-1].x=x;
              cars[index-1].y=y;

                  if(index===player.index)
                  {
                    cars[index-1].shapeColor="red"
                    camera.position.x=displayWidth/2;
                    camera.position.y=cars[index-1].y;
                  }

              index++;  
          }
    }

        if(keyIsDown(UP_ARROW) && player.index !== null)
        {
          player.distance +=40 
          player.update();
        }
    drawSprites();
    textSize(30); 
    text("Game Start", displayWidth/2-20, displayHeight+90)
  }


}
