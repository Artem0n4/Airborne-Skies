var IAHelper;LIBRARY({name:"ItemAnimHelper",version:2,shared:!1,api:"CoreEngine"}),function(e){function t(t){e.debugMode=t}function i(t,i,r,n){if(!e.debugMode&&FileTools.isExists(__dir__+"/"+r+n+"_0.png"))return Logger.Log("The texture frame on the given result path already exists, texture generation process cancelled!","ItemAnimHelper DEBUG");var m=FileTools.ReadImage(__dir__+"/"+t+i+".png");if(m.getHeight()%m.getWidth()!=0)return Logger.Log("Invalid 'tall' texture on the path '"+__dir__+"/"+t+i+".png'. Texture's height must be a multiple of texture's width","ItemAnimHelper ERROR");for(var a=0;a<m.getHeight()/m.getWidth();a++){for(var o=android.graphics.Bitmap.createBitmap(m.getWidth(),m.getWidth(),android.graphics.Bitmap.Config.ARGB_8888),d=0;d<m.getWidth();d++)for(var g=0;g<m.getWidth();g++)o.setPixel(d,g,m.getPixel(d,g+m.getWidth()*a));FileTools.WriteImage(__dir__+"/"+r+n+"_"+a+".png",o)}}function r(t,i,r,n){if(e.itemAnims[i])return Logger.Log("An error occured calling 'ItemAnimHelper.makeCommonAnim' method. Another animation is already bound to item '"+Item.getName(t,0)+"'","ItemAnimHelper ERROR");e.itemAnims[i]={meta:0,timer:0};var m=e.itemAnims[i];Callback.addCallback("LocalTick",function(){m.timer+1==r&&(m.meta<n-1?m.meta++:m.meta=0),m.timer<r?m.timer++:m.timer=0}),Item.registerIconOverrideFunction(t,function(t,r){return{name:i,data:e.itemAnims[i].meta}})}function n(t,i,r,n){if(e.itemAnims[i])return Logger.Log("An error occured calling 'IAHelper.makeAdvancedAnim' method. Another animation is already bound to item '"+Item.getName(t,0)+"'.","ItemAnimHelper ERROR");e.itemAnims[i]={meta:0,timer:0,frameIndex:0};var m=e.itemAnims[i];Callback.addCallback("LocalTick",function(){m.timer+1==r&&(m.frameIndex<n.length?m.frameIndex++:m.frameIndex=0,m.meta=n[m.frameIndex]),m.timer<r?m.timer++:m.timer=0}),Item.registerIconOverrideFunction(t,function(t,r){return{name:i,data:e.itemAnims[i].meta}})}e.debugMode=!1,e.toggleDebugMode=t,e.itemAnims={},e.convertTexture=i,e.makeCommonAnim=r,e.makeAdvancedAnim=n}(IAHelper||(IAHelper={})),EXPORT("IAHelper",IAHelper);