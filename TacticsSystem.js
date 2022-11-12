//=============================================================================
// TacticsSystem.js v1.2 MZ
// ported by plokr to RPG Maker MZ and included teleport functionality in basic
// MV version by Bilal El Moussaoui aka arleq1n: https://github.com/belmoussaoui/Tactics-System
// see for licensing 
//=============================================================================

/*:
 * @target MZ
 * @plugindesc A Tactical Battle System for RPG Maker MZ, based on belmoussaoui /
Tactics-System (https://github.com/belmoussaoui/Tactics-System).
 * @author plokr & Bilal El Moussaoui (https://twitter.com/arleq1n) aka arleq1n
 *
 * @requiredAssets img/system/selector.png
 * 
 * @param basicParameters
 * @text Basic Parameters
 *
 * @param selectorSpeed
 * @text Selector Speed
 * @parent basicParameters
 * @desc The selector speed.
 * @default 2
 * @option Slow
 * @value 1
 * @option Normal
 * @value 2
 * @option Fast
 * @value 3
 * @type select
 *
 * @param gridOpacity
 * @text Grid Opacity
 * @parent basicParameters
 * @desc The grid opacity of the battle scene.
 * @default 30
 * @min 0
 * @max 255
 * @type number
 *
 * @param movePoints
 * @text Move Points
 * @parent basicParameters
 * @desc The movement distance of a unit if undefined.
 * @default 5
 * @min 0
 * @type number
 *
 * @param actionRange
 * @text Action Range
 * @parent basicParameters
 * @desc The range distance of skill or item if undefined.
 * @default 1
 *
 * @param waitSkillId
 * @text Wait Skill Id
 * @parent basicParameters
 * @desc The wait skill id in the database if the unit can't shield.
 * @default 7
 * @min 1
 * @type skill
 *
 * @param autoTurnEnd
 * @text Auto Turn End
 * @parent basicParameters
 * @desc Automatically end the player turn when all units have played.
 * @default true
 * @on Yes
 * @off No
 * @type boolean
 *
 * @param tilesColor
 * @text Tiles Color
 *
 * @param moveScopeColor
 * @text Move Scope Color
 * @parent tilesColor
 * @desc The color to display the move range.
 * @default #0066CC
 *
 * @param allyScopeColor
 * @text Ally Scope Color
 * @parent tilesColor
 * @desc The color to display the range of an action on an ally.
 * @default #008000
 *
 * @param enemyScopeColor
 * @text Enemy Scope Color
 * @parent tilesColor
 * @desc The color to display the range of an action on an enemy.
 * @default #B22222
 *
 * @param displayManager
 * @text Display Manager
 *
 * @param showHpGauge
 * @text Show Hp Gauge
 * @parent displayManager
 * @desc Show the hp gauge below the unit.
 * @default true
 * @on Yes
 * @off No
 * @type boolean
 *
 * @param showBattleStart
 * @text Show Battle Start
 * @parent displayManager
 * @desc Show the battle start sprite.
 * @default true
 * @on Yes
 * @off No
 * @type boolean
 *
 * @param durationStartSprite
 * @text Duration Start Sprite
 * @parent displayManager
 * @desc The duration to display the start sprite.
 * @default 300
 * @min 0
 * @type number
 *
 * @param showInformationWindow
 * @text Show Information Window
 * @parent displayManager
 * @desc Show the information battle window.
 * @default true
 * @on Yes
 * @off No
 * @type boolean
 *
 * @param fadeOutEnd
 * @text Fade Out End
 * @parent displayManager
 * @desc Fade out at the end of the battle. You need to fade in
 * with a command's event after the battle.
 * @default true
 * @on Yes
 * @off No
 * @type boolean
 *
 * @param setTransparentUnit
 * @text Set Transparent Unit
 * @parent displayManager
 * @desc Set Transparent to true at the end of the battle.
 * @default true
 * @on Yes
 * @off No
 * @type boolean
 *
 * @param showFaceUnit
 * @text Show Face Unit
 * @parent displayManager
 * @desc Show the face of unit otherwise display the charset.
 * @default true
 * @on Yes
 * @off No
 * @type boolean
 *
 * @param textManager
 * @text Text Manager
 *
 * @param battleStartTerm
 * @text Battle Start Term
 * @parent textManager
 * @desc The battle start term.
 * @default Battle Start
 *
 * @param endTurnTerm
 * @text End Turn Term
 * @parent textManager
 * @desc The end turn term.
 * @default End Turn
 *
 * @param damageTerm
 * @text Damage Term
 * @parent textManager
 * @desc The damage abbrevation term.
 * @default Damage
 *
 * @param recoverTerm
 * @text Recover Term
 * @parent textManager
 * @desc The recover abbrevation term.
 * @default Recover
 *
 * @param drainTerm
 * @text Drain Term
 * @parent textManager
 * @desc The drain abbrevation term.
 * @default Drain
 *
 * @param hitRateTerm
 * @text Hit Rate Term
 * @parent textManager
 * @desc The hit rate abbrevation term.
 * @default Hit Rate
 *
 * @param criticalRateTerm
 * @text Critical Rate Term
 * @parent textManager
 * @desc The critical rate abbrevation term.
 * @default Cri Rate
 *
 * @param teleportTerm
 * @text Teleport Info Term
 * @parent textManager
 * @desc The term show in battle info window for teleport spells.
 * @default Teleport
 *
 * @param otherActionTerm
 * @text Term for other Skill/Item Actions
 * @parent textManager
 * @desc The term show in battle info window for other actions (not damage, recovery, drain or teleport). If a <Name> is given, this is used.
 * @default Other Effect
 *
 * @param waitCommandName
 * @text Wait Command Name
 * @parent textManager
 * @desc The wait command name to display in actor command window.
 * @default Wait
 *
 * 
 * @param progressionManager
 * @text Progression Manager
 *
 * @param battleStartId
 * @text Battle Start Id
 * @parent progressionManager
 * @desc The switch id to set if the battle has started.
 * @default 1
 * @min 1
 * @type switch
 *
 * @param playerPhaseId
 * @text Player Phase Id
 * @parent progressionManager
 * @desc The switch id to set if it's the player phase.
 * @default 2
 * @min 1
 * @type switch
 *
 * @param enemyPhaseId
 * @text Enemy Phase Id
 * @parent progressionManager
 * @desc The switch id to set if it's the enemy phase.
 * @default 3
 * @min 1
 * @type switch
 *
 * @param currentPhaseId
 * @text Current Phase Id
 * @parent progressionManager
 * @desc The variable id to set the current phase.
 * 1: startPhase, 2 : playerPhase, 3 : enemyPhase, 4 : battleEnd (can't to be use)
 * @default 1
 * @min 1
 * @type variable
 *
 * @param currentPlayerPhaseId
 * @text Current Player Phase Id
 * @parent progressionManager
 * @desc The variable id to set the sub phase of player.
 * 1: explore, 2 : select, 3 : target
 * @default 2
 * @min 1
 * @type variable
 *
 * @param currentBattlePhaseId
 * @text Current Battle Phase Id
 * @parent progressionManager
 * @desc The variable id to set the sub phase of player and enemy.
 * 1: start, 2 : move, 3 : action, 4 : turnEnd (can't to be use)
 * @default 3
 * @min 1
 * @type variable
 *
 * @param turnCountId
 * @text Turn Count Id
 * @parent progressionManager
 * @desc The variable id to set the turn count of battle.
 * @default 4
 * @min 1
 * @type variable
 * 
 * @param teleport
 * @text Teleport
 * 
 * @param teleportDistanceFormula
 * @text Teleport Distance Formula
 * @parent teleport
 * @desc The formula of distance for teleport skill.
 * @default a.mat/2
 *
 *
 * @command ProcessVictory
 * @text Process Victory
 * @desc Proceed immediately to the victory of the battle.
 * 
 * @command ProcessDefeat
 * @text Process Defeat
 * @desc Proceed immediately to the defeat of the battle.
 * 
 * @command ClearAll
 * @text Clear All
 * @desc Activate or desactivate clear all condition victory.
 * 
 * @arg active
 * @text active
 * @desc Activate or desactivate clear all condition victory.
 * @default true
 * @on On 
 * @off Off
 * @type boolean
 * 
 * @command SelectorActive
 * @text Selector Active
 * @desc Activate or desactivate selector.
 * 
 * @arg active
 * @text active
 * @desc Activate or desactivate selector.
 * @default true
 * @on On 
 * @off Off
 * @type boolean
 *
 * @command SelectorTransfer
 * @text Selector Transfer
 * @desc Move immediately the selector to position x and y.
 * 
 * @arg x
 * @text x coord
 * @desc x coord of position
 * @type number
 * @default 1
 * @min 1
 *
 * @arg y
 * @text y coord
 * @desc y coord of position
 * @type number
 * @default 1
 * @min 1
 *
 * @command SelectorMoveTo
 * @text Selector MoveTo
 * @desc Move the selector to position x and y.
 * 
 * @arg x
 * @text x coord
 * @desc x coord of position
 * @type number
 * @default 1
 * @min 1
 *
 * @arg y
 * @text y coord
 * @desc y coord of position
 * @type number
 * @default 1
 * @min 1
 *
 * @command SelectorEvent
 * @text Selector Event
 * @desc Move immediately the selector to position at event of eventId.
 * 
 * @arg event
 * @text event id
 * @desc event if of event to move the selector to
 * @type number
 * @default 1
 * @min 1
 *
 * @command SelectorSave
 * @text Selector Save
 * @desc saves the current selector position
 *
 * @command SelectorRestore
 * @text Selector Restore
 * @desc restores to saved selector position
 *
 * @command BattlerEndAction
 * @text Battler End Action
 * @desc Ends the subject's turn.
 *
 * @command WindowCloseCommand
 * @text Window Close Command
 * @desc close command window
 *
 * @command MapClearTiles
 * @text Map Clear Tiles
 * @desc clears all map tiles
 *
 *     
 * @help
 * -----------------------------------------------------------------------------
 * Basics
 *
 * Use the Battle Processing command of an event (with parallel trigger)
 * to start a tactics battle in the current map.
 * You can't start a battle on another map or without transition.
 *
 * You can define the actors of the battle by creating events with the note
 * <Actor:actorId> or with the note <Party:index> to directly use a member
 * of the party.
 *
 * You can define the enemies of the battle by creating events with the note
 * <Enemy:enemyId> or with this tag <Troop:index> to bind the event to enemy
 * in troops of the database. This will allow you to create events with the
 * conditions of the battle.
 *
 * Note Tag
 *
 * There are several note tags to define parameters specific to the
 * Tactics System.
 *
 * <Move:int> [enemies, events, actors, classes] 
 *    Defines the movement distance of a unit. Ignores values below 1.
 *    Tags in Enemy has higher priority than in Event, and in Actor is higher than Class
 * 
 * 
 * <MoveMod:int> [armor, state] 
 *    Add buff/debuff move for an item/state, accepts negative value (Move Modification)
 *
 *  <Ts-Parameter: Move +int/-int> [item, state] DEPRECATED
 *    Deprecated leagcy note tag, to ensure downwards compatibility, will be removed in next version, use <MoveMod> instead
 *
 * <Aggro:int> [enemies, events]
 *    Set the distance of action of an enemy. Setting it to 1 allows
 *    to create enemies that don't move. (Aggressivity)
 *    If no value is set, Aggro is set to 99(!)
 *    Enemy will move/attack if party member is in range of Aggro + Weapon-Range
 *
 * [skill, weapon]
 * <Range:int> Set the range of an action (in diamond = line)
 * <Range:int int> Set the min and max. range of an action (in diamond)
 * <Range:int int shape> in a shape=[diamond,rectangle,line], min can be zero, 
 *
 * <Name:string> [event]
 *    Set the name of an event in actor command.
 * <Name:string> [skill, item]
 *    Set the name/term of an skill or item in the battle info window - only used for DamageType 'None' (except Teleport)
 *    If no name is given, the parameter 'otherActionTerm' (see above) is used.
 * 
 * <Effect:Teleport>
 *    to be used in the note section of a skill to define it as a teleport skill.
 *    You can only choose an enemy, an ally or the user as a scope. All other
 *    parameters of the skill are defined in the same way as a normal skill.
 *    You can also define the distance of the teleportation by a formula that works
 *    in the same way as the damage formula by the tag <Formula:a.mat/2>.
 *
 * Plugin Commands
 *
 * ProcessVictory
 *     Proceed immediately to the victory of the battle.
 *
 * ProcessDefeat
 *     Proceed immediately to the defeat of the battle.
 *
 * SelectorMoveTo x y
 *     Move the selector to position x and y.
 *
 * SelectorTransfer x y
 *     Move immediately the selector to position x and y.
 *
 * SelectorEvent eventId
 *     Move immediately the selector to position at event of eventId.
 *
 * SelectorSave
 *     saves current selector position
 * 
 * SelectorRestore
 *     restores to saved selector position
 *
 * SelectorActive on/off
 *     Activate or deactivate selector. A deactived selector is not invisible but the player cannot control it!
 * 
 * ClearAll on/off
 *     Activate or desactivate clear all condition victory.
 *
 * BattlerEndAction
 *     Ends the subject's turn.
 * 
 * MapClearTiles
 *     clears all map tiles
 *
 * WindowCloseCommand
 *     close command window 
 * 
 * Licensing
 * This plugin and its base (belmoussaoui / Tactics-System, https://github.com/belmoussaoui/Tactics-System)
 * are licensed by MIT license (see LICENSE.txt, license file must be part of distribution, appropiate credits must be given.)
 * Source on github: 
 * 
 * Please give credit to arleq1n and plokr if you are using this pluging in your RPG Maker project.
 */

//-----------------------------------------------------------------------------
// TacticsSystem
//
// The static class that loads Effekseer effects.

class TacticsSystem {

    constructor() {
        throw new Error("This is a static class");
    }

    static getParamString (paraName){
        return String(TacticsSystem.parameters[paraName]);
    };

    static getParamNumber(paraName){
        return Number(TacticsSystem.parameters[paraName]);
    };

    static getParamBoolean(paraName){
        return (String(TacticsSystem.parameters[paraName]).toLowerCase() === 'true');
    };
    
    // load plugin parameters used as constants (read only)
    static pluginName = "TacticsSystem";
    static parameters = PluginManager.parameters(TacticsSystem.pluginName);
    
    static selectorFile =          "selector";
    static selectorSpeed =         TacticsSystem.getParamNumber('selectorSpeed');
    static mvp =                   TacticsSystem.getParamNumber('movePoints');
    static actionRange =           TacticsSystem.getParamString('actionRange');
    static waitSkillId =           TacticsSystem.getParamNumber('waitSkillId');
    static autoTurnEnd =           TacticsSystem.getParamBoolean('autoTurnEnd');
    static moveScopeColor =        TacticsSystem.getParamString('moveScopeColor');
    static allyScopeColor =        TacticsSystem.getParamString('allyScopeColor');
    static enemyScopeColor =       TacticsSystem.getParamString('enemyScopeColor');
    static gridOpacity =           TacticsSystem.getParamNumber('gridOpacity');
    static showHpGauge =           TacticsSystem.getParamBoolean('showHpGauge');
    static durationStartSprite =   TacticsSystem.getParamNumber('durationStartSprite');
    static fadeOutEnd =            TacticsSystem.getParamBoolean('fadeOutEnd');
    static setTransparentUnit =    TacticsSystem.getParamBoolean('setTransparentUnit');
    static showFaceUnit =          TacticsSystem.getParamBoolean('showFaceUnit');
    static battleStartTerm =       TacticsSystem.getParamString('battleStartTerm');
    static endTurnTerm =           TacticsSystem.getParamString('endTurnTerm');
    static damageTerm =            TacticsSystem.getParamString('damageTerm');
    static recoverTerm =           TacticsSystem.getParamString('recoverTerm');
    static drainTerm =             TacticsSystem.getParamString('drainTerm');
    static hitRateTerm =           TacticsSystem.getParamString('hitRateTerm');
    static criticalRateTerm =      TacticsSystem.getParamString('criticalRateTerm');
    static teleportTerm =          TacticsSystem.getParamString('teleportTerm');
    static otherActionTerm =       TacticsSystem.getParamString('otherActionTerm');
    static wait =                  TacticsSystem.getParamString('waitCommandName');
    static battleStartId =         TacticsSystem.getParamNumber('battleStartId');
    static playerPhaseId =         TacticsSystem.getParamNumber('playerPhaseId');
    static enemyPhaseId =          TacticsSystem.getParamNumber('enemyPhaseId');
    static phaseVarId =            TacticsSystem.getParamNumber('currentPhaseId');
    static playerPhaseVarId =      TacticsSystem.getParamNumber('currentPlayerPhaseId');
    static battlePhaseVarId =      TacticsSystem.getParamNumber('currentBattlePhaseId');
    static turnCountVarId =        TacticsSystem.getParamNumber('turnCountId');
    static showBattleStart =       TacticsSystem.getParamBoolean('showBattleStart');
    static teleportFormula =       TacticsSystem.getParamString('teleportDistanceFormula');
    static showInformationWindow = TacticsSystem.getParamBoolean('showInformationWindow');
    
    // in game use as var
    static clearAll = true; // in game system
    static isDefeated = false; // in game system
}

//-----------------------------------------------------------------------------
// Register plugin commands in PluginManager
//
(function () {
    PluginManager.registerCommand(TacticsSystem.pluginName, "ProcessVictory", args => { Game_Interpreter.prototype.processVictory.call(this);});
    PluginManager.registerCommand(TacticsSystem.pluginName, "ProcessDefeat", args => { Game_Interpreter.prototype.processDefeat.call(this);});
    PluginManager.registerCommand(TacticsSystem.pluginName, "ClearAll", args => { Game_Interpreter.prototype.clearAll.call(this, args['active']);});
    PluginManager.registerCommand(TacticsSystem.pluginName, "SelectorActive", args => { Game_Interpreter.prototype.selectorActive.call(this, args['active']);});
    PluginManager.registerCommand(TacticsSystem.pluginName, "SelectorTransfer", args => { Game_Interpreter.prototype.selectorTransfer.call(this, args['x'], args['y']);});
    PluginManager.registerCommand(TacticsSystem.pluginName, "SelectorMoveTo", args => { Game_Interpreter.prototype.selectorMoveTo.call(this, args['x'], args['y']);});
    PluginManager.registerCommand(TacticsSystem.pluginName, "SelectorEvent", args => { Game_Interpreter.prototype.selectorEvent.call(this, args['event']);});
    PluginManager.registerCommand(TacticsSystem.pluginName, "SelectorSave", args => { Game_Interpreter.prototype.selectorSave.call(this);});
    PluginManager.registerCommand(TacticsSystem.pluginName, "SelectorRestore", args => { Game_Interpreter.prototype.selectorRestore.call(this);});
    PluginManager.registerCommand(TacticsSystem.pluginName, "BattlerEndAction", args => { Game_Interpreter.prototype.battlerEndAction.call(this);});
    PluginManager.registerCommand(TacticsSystem.pluginName, "WindowCloseCommand", args => { Game_Interpreter.prototype.windowCloseCommand.call(this);});
    PluginManager.registerCommand(TacticsSystem.pluginName, "MapClearTiles", args => { Game_Interpreter.prototype.mapClearTiles.call(this);});
})();

//-----------------------------------------------------------------------------
// Game_Interpreter

Game_Interpreter.prototype.clearAll = function(active) { //
    if (active == "false") {
        TacticsSystem.clearAll = false;
    } else {
        TacticsSystem.clearAll = true;
    }
};

Game_Interpreter.prototype.processVictory = function() {
    BattleManager.processVictory();
};

Game_Interpreter.prototype.processDefeat = function() {
    TacticsSystem.isDefeated = true;
    BattleManager.processDefeat();
};

Game_Interpreter.prototype.selectorActive = function(active) {
     if (active == "false") {
        $gameSelector.deactivate();
    } else {
        $gameSelector.activate();
    }
};

Game_Interpreter.prototype.selectorTransfer = function(x, y) {
    $gameSelector.performTransfer(Number(x), Number(y));
    Game_Interpreter.prototype.setWaitMode.call(this, 'TacticsSystem.selector');
};

Game_Interpreter.prototype.selectorMoveTo = function(x, y) {
    $gameSelector.moveTo(Number(x), Number(y));
    Game_Interpreter.prototype.setWaitMode.call(this, 'TacticsSystem.selector');
};

Game_Interpreter.prototype.selectorEvent = function(eventId) {
    var event = $gameMap.event(Number(eventId));
    $gameSelector.performTransfer(event.x, event.y);
    Game_Interpreter.prototype.setWaitMode.call(this, 'TacticsSystem.selector');
};

Game_Interpreter.prototype.selectorSave = function() {
    $gameSelector.savePosition();
};

Game_Interpreter.prototype.selectorRestore = function() {
    $gameSelector.restorePosition();
};

Game_Interpreter.prototype.battlerEndAction = function() {
    BattleManager.endAction();
};

Game_Interpreter.prototype.windowCloseCommand= function() {
    BattleManager.closeCommand();
};

Game_Interpreter.prototype.mapClearTiles = function() {
    $gameMap.clearTiles();
};


//-----------------------------------------------------------------------------
/**
 * The basic object that represents an image.
 *
 * @class Bitmap
 * @constructor
 * @param {Number} width The width of the bitmap
 * @param {Number} height The height of the bitmap
 */

/**
 * Draw a line, new
 *
 * @method drawLine
 * @param {Number} x1 The x coordinate for the start.
 * @param {Number} y1 The y coordinate for the start.
 * @param {Number} x2 The x coordinate for the destination.
 * @param {Number} y2 The y coordinate for the destination.
 */
Bitmap.prototype.drawLine = function(x1, y1, x2, y2) {
    var context = this._context;
    context.save();
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.restore();
    this._baseTexture.update();
};

//-----------------------------------------------------------------------------
// DataManager
//
// The static class that manages the database and game objects.

TacticsSystem.DataManager_createGameObjects = DataManager.createGameObjects;

DataManager.createGameObjects = function() {
    $gameSelector = new Game_Selector();
    $gameTroopTs  = new Game_TroopTs();
    $gamePartyTs  = new Game_PartyTs();
    TacticsSystem.DataManager_createGameObjects.call(this);
};

//-----------------------------------------------------------------------------
// SceneManager, new
//
// The static class that manages scene transitions.

SceneManager.isCurrentScene = function(sceneClass) {
    return this._scene && this._scene.constructor === sceneClass;
};


//-----------------------------------------------------------------------------
// Scene_Battle
//
// The scene class of the tactics screen.

Scene_Battle.prototype.start = function() {
    $gameSwitches.setValue(TacticsSystem.battleStartId, true);
    $gamePlayer.setThrough(true);
    Scene_Message.prototype.start.call(this);
    BattleManager.playBattleBgm();
    BattleManager.startBattle();
    this._statusWindow.refresh(); 
    this.startFadeIn(this.slowFadeSpeed(), false);
    this.menuCalling = false;
    this.loadFaceset();
};

//new
Scene_Battle.prototype.loadFaceset = function() {
    this._statusWindow.refresh();
    this.loadFacesetActor();
    this.loadFacesetEnemy();
};

//new
Scene_Battle.prototype.loadFacesetActor = function() {
    $gamePartyTs.members().forEach(function(member) {
        ImageManager.loadFace(member.faceName());
    });
};

//new
Scene_Battle.prototype.loadFacesetEnemy = function() {
    $gameTroopTs.members().forEach(function(member) {
        ImageManager.loadEnemy(member.battlerName());
    });
};

Scene_Battle.prototype.update = function() {
    this.updateDestination();
    const active = this.isActive();
    $gameMap.update(active);
    $gameTimer.update(active);
    if (active && !this.isBusy()) {
        this.updateBattleProcess();
    }
    $gameSelector.update();
    $gameScreen.update();
    Scene_Message.prototype.update.call(this);
};

//new
Scene_Battle.prototype.updateDestination = function() {
    if (this.isMapTouchOk()) {
        this.processMapTouch();
    }
};

Scene_Battle.prototype.updateBattleProcess = function() {
    if (!this.isAnyInputWindowActive() || BattleManager.isBattleEnd()) {
        this.updateCallMenu();
        $gameSelector.updateMoveByInput();
        if (BattleManager.isInputting() && !$gameMap.isEventRunning()) {
            this.startActorCommandSelection();
        }
        BattleManager.update(this.isTimeActive());
    }
};

Scene_Battle.prototype.isAnyInputWindowActive = function() {
    return (this._tacticsCommandWindow.active ||
            this._skillWindow.active ||
            this._itemWindow.active ||
            this._mapWindow.active ||
            this._statusWindow.active);
};

Scene_Battle.prototype.stop = function() {
    Scene_Message.prototype.stop.call(this);
    if (this.needsSlowFadeOut()) {
        this.startFadeOut(this.slowFadeSpeed(), false);
    } else {
        this.startFadeOut(this.fadeSpeed(), false);
    }
    this._actorWindow.close();
    this._enemyWindow.close();
    this._infoWindow.close();
};

Scene_Battle.prototype.terminate = function() {
    Scene_Message.prototype.terminate.call(this);
    if (this.shouldAutosave()) {
        this.requestAutosave();
    }
};

Scene_Battle.prototype.createDisplayObjects = function() {
    this.createSpriteset();
    this.createWindowLayer();
    this.createAllWindows();
    this.createButtons();
    BattleManager.setLogWindow(this._logWindow);
    BattleManager.setSpriteset(this._spriteset);
    this._logWindow.setSpriteset(this._spriteset);
    // this is new
    BattleManager.setCommandWindow(this._tacticsCommandWindow);
    BattleManager.setActorWindow(this._actorWindow);
    BattleManager.setEnemyWindow(this._enemyWindow);
    BattleManager.setInfoWindow(this._infoWindow);    
};

Scene_Battle.prototype.createSpriteset = function() {
    this._spriteset = new Spriteset_Tactics();
    this.addChild(this._spriteset);
};

Scene_Battle.prototype.createAllWindows = function() { 
    this.createLogWindow();
    this.createStatusWindow();
    this.createActorCommandWindow();
    this.createHelpWindow();
    this.createSkillWindow();
    this.createItemWindow();
    this.createActorWindow();
    this.createEnemyWindow();
    if(TacticsSystem.showInformationWindow) {this.createInfoWindow();} else {this.createInfoWindowProxy()}
    this.createMapWindow();
    Scene_Message.prototype.createAllWindows.call(this); 
};

Scene_Battle.prototype.createStatusWindow = function() {
    const rect = this.statusWindowRect();  
    this._statusWindow = new Window_MenuStatus(rect);
    this._statusWindow.loadFaceImages();
    this._statusWindow.hide();
    this.addWindow(this._statusWindow);
};

Scene_Battle.prototype.statusWindowRect = function() {
    const rectCmd = Window_TacticsCommand.prototype.windowTacticsCommandRect();
    const wx = rectCmd.width + 10;
    const wy = 0;
    const ww = Graphics.boxWidth - wx -10;
    const wh = Graphics.boxHeight - 10;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.createActorCommandWindow = function() {
    const rect = Window_TacticsCommand.prototype.windowTacticsCommandRect();
    this._tacticsCommandWindow = new Window_TacticsCommand(rect);
    this._tacticsCommandWindow.setHandler('attack', this.commandAttack.bind(this));
    this._tacticsCommandWindow.setHandler('skill',  this.commandSkill.bind(this));
    this._tacticsCommandWindow.setHandler('guard',  this.commandGuard.bind(this));
    this._tacticsCommandWindow.setHandler('item',   this.commandItem.bind(this));
    this._tacticsCommandWindow.setHandler('event',  this.commandEvent.bind(this));
    this._tacticsCommandWindow.setHandler('cancel', this.selectPreviousCommand.bind(this));
    this._tacticsCommandWindow.setHandler('wait',   this.commandWait.bind(this));
    this.addWindow(this._tacticsCommandWindow);
};

Scene_Battle.prototype.createSkillWindow = function() {
    const rect = this.skillWindowRect();
    this._skillWindow = new Window_TacticsSkill(rect);
    this._skillWindow.setHelpWindow(this._helpWindow);
    this._skillWindow.setHandler('ok',     this.onSkillOk.bind(this));
    this._skillWindow.setHandler('cancel', this.onSkillCancel.bind(this));
    this.addWindow(this._skillWindow);
};

Scene_Battle.prototype.createItemWindow = function() {
    const rect = this.itemWindowRect();
    this._itemWindow = new Window_TacticsItem(rect);
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
    this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
    this.addWindow(this._itemWindow);
};

Scene_Battle.prototype.createActorWindow = function() {
    const rect = this.actorBattleWindowRect();
    this._actorWindow = new Window_TacticsStatus(rect);
    this.addWindow(this._actorWindow);
};

Scene_Battle.prototype.actorBattleWindowRect = function (){
    var rect = Window_TacticsStatus.prototype.windowTacticsStatusRect();
    rect.x = Graphics.boxWidth / 2 + 32;
    return rect;
}

Scene_Battle.prototype.createEnemyWindow = function() {
    const rect = this.enemyWindowRect();
    this._enemyWindow = new Window_TacticsStatus(rect);
    this.addWindow(this._enemyWindow);
};

Scene_Battle.prototype.enemyWindowRect = function (){
    var rect = Window_TacticsStatus.prototype.windowTacticsStatusRect();
    return rect;
}

Scene_Battle.prototype.createInfoWindow = function() { 
    this._infoWindow = new Window_TacticsInfo();
    this._infoWindow.x = Graphics.boxWidth / 2 - this._infoWindow.width / 2;
    this._infoWindow.y = 0;
    this.addWindow(this._infoWindow);
};

Scene_Battle.prototype.createInfoWindowProxy = function() { // to handle open / close call without doing anything
    this._infoWindow = new Object();
    this._infoWindow.close = function () {};
    this._infoWindow.open = function () {};
}

Scene_Battle.prototype.createMapWindow = function() { 
    this._mapWindow = new Window_TacticsMap();
    this._mapWindow.setHandler('endTurn', this.commandEndTurn.bind(this));
    this._mapWindow.setHandler('equip',   this.commandPersonal.bind(this));
    this._mapWindow.setHandler('status',  this.commandPersonal.bind(this));
    this._mapWindow.setHandler('options', this.commandOptions.bind(this));
    this._mapWindow.setHandler('gameEnd', this.commandGameEnd.bind(this));
    this._mapWindow.setHandler('cancel',  this.commandCancelMapWindow.bind(this));
    this.addWindow(this._mapWindow);
};

Scene_Battle.prototype.startActorCommandSelection = function() {
    this._actorWindow.show();
    this._tacticsCommandWindow.setup(BattleManager.actor());
};

Scene_Battle.prototype.commandAttack = function() {
    const action = BattleManager.inputtingAction();
    action.setAttack();
    BattleManager.setupCombat(action);
    BattleManager.refreshRedCells(action);
    this.onSelectAction();
};

Scene_Battle.prototype.commandSkill = function() {
    this._actorWindow.hide();
    this._skillWindow.setActor(BattleManager.actor());
    this._skillWindow.setStypeId(this._tacticsCommandWindow.currentExt());
    this._skillWindow.refresh();
    this._skillWindow.show();
    this._skillWindow.activate();          
};

Scene_Battle.prototype.commandGuard = function() {
    BattleManager.inputtingAction().setGuard();
    this._tacticsCommandWindow.close();
    BattleManager.setupAction();
};

Scene_Battle.prototype.commandItem = function() {
    this._actorWindow.hide();
    this._itemWindow.refresh();
    this._itemWindow.show();
    this._itemWindow.activate();
};

Scene_Battle.prototype.commandEvent = function() {
    $gameTemp.setCancel(false);
    var subject = BattleManager.actor();
    var eventId = subject.actionsButton()[this._tacticsCommandWindow.index()];
    var event = $gameMap.event(eventId);
    event.start();
    BattleManager.turnTowardCharacter(event);
    this._tacticsCommandWindow.close();
};

Scene_Battle.prototype.commandWait = function() {
    BattleManager.inputtingAction().setWait();
    BattleManager.setupAction();
    this._tacticsCommandWindow.close();
};

Scene_Battle.prototype.commandEndTurn = function() {
    SoundManager.playOk();
    BattleManager.onAllTurnEnd();
    this.commandCancelMapWindow();
};

Scene_Battle.prototype.commandPersonal = function() {
    this._statusWindow.setFormationMode(false);
    this._statusWindow.selectLast();
    this._statusWindow.activate();
    this._statusWindow.setHandler('ok',     this.onPersonalOk.bind(this));
    this._statusWindow.setHandler('cancel', this.onPersonalCancel.bind(this));
};

Scene_Battle.prototype.commandFormation = function() {
};

Scene_Battle.prototype.commandOptions = function() {
    SceneManager.push(Scene_Options);
    $gameSelector.setTransparent(false);
    this._actorWindow.show();
};

Scene_Battle.prototype.commandGameEnd = function() {
    SceneManager.push(Scene_GameEnd);
};

Scene_Battle.prototype.commandCancelMapWindow = function() {
    $gameSelector.setTransparent(false);
    this._actorWindow.show();
    this._mapWindow.hide();
    this._statusWindow.hide();
    this._actorWindow.show();
    this._enemyWindow.show();
    this._mapWindow.deactivate();
    this.menuCalling = false;
};

Scene_Battle.prototype.selectPreviousCommand = function() {
    if ($gameTemp.canCancel()) {
        SoundManager.playCancel();
        BattleManager.previousSelect();
        this.endCommandSelection();
    }
};

Scene_Battle.prototype.onSkillOk = function() {
    this._actorWindow.show();
    const skill = this._skillWindow.item();
    const action = BattleManager.inputtingAction();
    action.setSkill(skill.id);
    BattleManager.actor().setLastBattleSkill(skill);
    this.onSelectAction();
};

Scene_Battle.prototype.onSkillCancel = function() {
    BattleManager.processCancel();
    this._actorWindow.show();
    this._skillWindow.hide();
    this._tacticsCommandWindow.activate();
};

Scene_Battle.prototype.onItemOk = function() {
    this._actorWindow.show();
    const item = this._itemWindow.item();
    const action = BattleManager.inputtingAction();
    action.setItem(item.id);
    $gameParty.setLastItem(item);
    this.onSelectAction();
};

Scene_Battle.prototype.onItemCancel = function() {
    BattleManager.processCancel();
    this._actorWindow.show();
    this._itemWindow.hide();
    this._tacticsCommandWindow.activate();
};

Scene_Battle.prototype.onPersonalOk = function() {
    $gameSelector.setTransparent(false);
    switch (this._mapWindow.currentSymbol()) {
    case 'skill':
        SceneManager.push(Scene_Skill);
        break;
    case 'equip':
        SceneManager.push(Scene_Equip);
        break;
    case 'status':
        SceneManager.push(Scene_Status);
        break;
    }
};

Scene_Battle.prototype.onPersonalCancel = function() {
    this._statusWindow.deselect();
    this._mapWindow.activate();
    $gameSelector.setTransparent(false);
};

Scene_Battle.prototype.isMenuEnabled = function() {
    return $gameSystem.isMenuEnabled() && !$gameMap.isEventRunning();
};

Scene_Battle.prototype.isMenuCalled = function() {
    return Input.isTriggered('menu') || TouchInput.isCancelled();
};

Scene_Battle.prototype.updateCallMenu = function() {
    if (this.isMenuEnabled()) {
        if (this.menuCalling) {
            $gameSelector.setTransparent(true);
            this._actorWindow.hide();
            SceneManager.snapForBackground();
            SoundManager.playOk();
            this.callMenu();
        }
         if (this.isMenuCalled() && BattleManager.isExploring()) {
            this.menuCalling = true;
        }
    } else {
        this.menuCalling = false;
    }
};

Scene_Battle.prototype.callMenu = function() {
    this.menuCalling = false;
    this._mapWindow.show();
    this._statusWindow.show();
    this._actorWindow.hide();
    this._enemyWindow.hide();
    this._mapWindow.activate();
};

Scene_Battle.prototype.isMapTouchOk = function() {
    return this.isActive() && BattleManager.isActive() && !this.isAnyInputWindowActive();
};

Scene_Battle.prototype.processMapTouch = function() {
    if (TouchInput.isTriggered()) {
        var x = $gameMap.canvasToMapX(TouchInput.x);
        var y = $gameMap.canvasToMapY(TouchInput.y);
        $gameSelector.moveTo(x, y);
    }
};

Scene_Battle.prototype.isBusy = function() {
    return ((this._messageWindow && this._messageWindow.isClosing()) ||
             Scene_Base.prototype.isBusy.call(this) || $gameSelector.isBusy());
};

Scene_Battle.prototype.onSelectAction = function() {
    var action = BattleManager.inputtingAction();
    this._skillWindow.hide();
    this._itemWindow.hide();
    this._tacticsCommandWindow.close();
    BattleManager.processTarget();
};

Scene_Battle.prototype.endCommandSelection = function() {
    this._tacticsCommandWindow.close();
};

//-----------------------------------------------------------------------------
// BattleManager
//
// The static class that manages tactics progress.

BattleManager.setup = function(troopId, canEscape, canLose) {
    this.initMembers();
    this._canEscape = canEscape;
    this._canLose = canLose;
    this.makeEscapeRatio();
    $gameTroop.setup(troopId);
    $gameSwitches.update();
    $gameVariables.update();
    var x = $gamePlayer.x;
    var y = $gamePlayer.y;
    $gameSelector.performTransfer(x, y);
    this._phase = 'startPhase';
};

BattleManager.initMembers = function() {
    this._phase = 'init';
    this._battlePhase = 'init';
    this._troopId = 0;
    this._canEscape = false;
    this._canLose = false;
    this._eventCallback = null;
    this._preemptive = false;
    this._surprise = false;
    this._actorIndex = -1;
    this._actionForcedBattler = null;
    this._actionBattlers = [];
    this._subject = null;
    this._action = null;
    this._targets = [];
    this._targetIndex = -1;
    this._logWindow = null;
    this._actorWindow = null;
    this._enemyWindow = null;
    this._spriteset = null;
    this._escapeRatio = 0;
    this._escaped = false;
    this._rewards = {};
    this._turnForced = false;
};

BattleManager.createGameObjects = function() {
    for (var i = 0; i < $gameMap.events().length; i++) {
        var event = $gameMap.events()[i];
        if (event.tparam('Actor') > 0) {
            this.addGameActor(event);
        } else if (event.tparam('Party') > 0) {
            this.addGameParty(event)
        } else if (event.tparam('Enemy') > 0) {
            this.addGameEnemy(event);
        } else if (event.tparam('Troop') > 0) {
            this.addGameTroop(event);
        } else {
            continue;
        }
    }
};

BattleManager.addGameActor = function(event) {
    var actorId = Number(event.tparam('Actor'));
    $gamePartyTs.addActor(actorId, event, true);
};

BattleManager.addGameParty = function(event) {
    var partyId = Number(event.tparam('Party'));
    var actorId = $gameParty.memberId(partyId);
    $gamePartyTs.addActor(actorId, event, true);
};

BattleManager.addGameEnemy = function(event) {
    var enemyId = Number(event.tparam('Enemy'));
    $gameTroopTs.addEnemy(enemyId, event);
};

BattleManager.addGameTroop = function(event) {
    var index = Number(event.tparam('Troop'));
    $gameTroopTs.addTroop(index, event);
};

BattleManager.setEventCallback = function(callback) {
    this._eventCallback = callback;
};

BattleManager.setLogWindow = function(logWindow) {
    this._logWindow = logWindow;
};

BattleManager.setCommandWindow = function(commandWindow) {
    this._commandWindow = commandWindow;
};

BattleManager.setActorWindow = function(actorWindow) {
    this._actorWindow = actorWindow;
};

BattleManager.setEnemyWindow = function(enemyWindow) {
    this._enemyWindow = enemyWindow;
};

BattleManager.setInfoWindow = function(infoWindow) {
    this._infoWindow = infoWindow;
};

BattleManager.setSpriteset = function(spriteset) {
    this._spriteset = spriteset;
};

BattleManager.onEncounter = function() {
    this._preemptive = (Math.random() < this.ratePreemptive());
    this._surprise = (Math.random() < this.rateSurprise() && !this._preemptive);
};

BattleManager.ratePreemptive = function() {
    return $gameParty.ratePreemptive($gameTroop.agility());
};

BattleManager.rateSurprise = function() {
    return $gameParty.rateSurprise($gameTroop.agility());
};

BattleManager.startBattle = function() {
    $gamePartyTs.onBattleStart();
    $gameTroopTs.onBattleStart();
    $gameScreen.onBattleStart();
    $gameSystem.onBattleStart();
};

BattleManager.isActive = function() {
    if (!this._logWindow.isBusy()) {
        switch (this._battlePhase) {
        case 'explore':
        case 'select':
        case 'target':
        case 'tile':
            return true;
        }
    }
    return false;
};

BattleManager.makeEscapeRatio = function() {
    this._escapeRatio = 0.5 * $gameParty.agility() / $gameTroop.agility();
};

BattleManager.update = function() {
    if (!this.isBusy() && !this.updateEvent()) {
        switch (this._phase) {
        case 'startPhase':
            this.updateStartPhase();
            break;
        case 'playerPhase':
            this.updatePlayerPhase();
            break;
        case 'enemyPhase':
            this.updatePhase();
            break;
        case 'battleEnd':
            this.updateBattleEnd();
            break;
        }
    }
};

BattleManager.updatePlayerPhase = function() {
    switch (this._battlePhase) {
    case 'explore':
        this.updateExplore();
        break;
    case 'select':
        this.updateSelect();
        break;
    case 'target':
        this.updateTarget();
        break;
    case 'tile':
            this.updateTile();
    default:
        this.updatePhase();
        break;
    }
};

BattleManager.updatePhase = function() {
    switch (this._battlePhase) {
    case 'start':
        this.updateStart();
        break;
    case 'move':
        this.updateMove();
        break;
    case 'open':
        this.processAction();
        break;
    case 'action':
        this.updateAction();
        break;
    case 'close':
        this.updateClose();
        break;
    case 'turnEnd':
        this.updateTurnEnd();
        break;
    }
};

BattleManager.isBusy = function() {
    return ($gameMessage.isBusy() || this._spriteset.isBusy() ||
        this._logWindow.isBusy() || $gameSelector.isBusy());
};

BattleManager.updateEvent = function() {
    switch (this._phase) {
    case 'startPhase':
    case 'playerPhase':
    case 'enemyPhase':
        $gameSwitches.update();
        $gameVariables.update();
        if (this.isActionForced()) {
            this.processForcedAction();
            return true;
        } else {
            return this.updateEventMain();
        }
    }
};

BattleManager.isActionForced = function() {
    return false;
};

BattleManager.updateEventMain = function() {
    $gameTroop.updateInterpreter();
    $gameParty.requestMotionRefresh();
    if ($gameTroop.isEventRunning() || this.checkBattleEnd()) {
        return true;
    }
    $gameTroop.setupBattleEvent();
    if ($gameTroop.isEventRunning() || SceneManager.isSceneChanging()) {
        return true;
    }
    if ($gameMap.isEventRunning()) {
        return true;
    }
    return false;
};

BattleManager.phase = function() {
    return this._phase;
};

BattleManager.battlePhase = function() {
    return this._battlePhase;
};

BattleManager.isPlayerPhase = function() {
    return this._phase === 'playerPhase';
};

BattleManager.isEnemyPhase = function() {
    return this._phase === 'enemyPhase';
};

BattleManager.isBattleEnd = function() {
    return this._phase === 'battleEnd';
};

BattleManager.isInputting = function() {
    return this._battlePhase === 'input';
};

BattleManager.isAborting = function() {
    return this._battlePhase === 'aborting';
};

BattleManager.isExploring = function() {
    return this._battlePhase === 'explore';
};

BattleManager.isTurnEnd = function() {
    return this._battlePhase === 'turnEnd';
};

BattleManager.canEscape = function() {
    return this._canEscape;
};

BattleManager.canLose = function() {
    return this._canLose;
};

BattleManager.isEscaped = function() {
    return this._escaped;
};

BattleManager.allBattlerMembers = function() {
    return $gamePartyTs.members().concat($gameTroopTs.members());
};

BattleManager.actor = function() {
    return this._actorIndex >= 0 ? $gamePartyTs.members()[this._actorIndex] : null;
};

BattleManager.makePlayerOrders = function() {
    this._playersOrder = $gamePartyTs.restrictedMembers();
};

BattleManager.makeEnemyOrders = function() {
    this._enemiesOrder = $gameTroopTs.battleMembers();
};

BattleManager.updateStartPhase = function() {
    this.makePlayerOrders();
    $gameTroop.increaseTurn();
    $gameTroopTs.onTurnStart();
    $gamePartyTs.onTurnStart();
    $gameSelector.setTransparent(true);
    this._logWindow.startTurn();
    this._phase = 'playerPhase';
    this._battlePhase = 'start';
    $gameSelector.updateSelect();
    this.refreshMoveTiles();
};


BattleManager.updateExplore = function() {
    this.refreshSubject();
    if ($gameSelector.isMoving()) {
        this.refreshMoveTiles();
    }
    var actor = $gameSelector.selectActor();
    if (actor) {
        this.selectActor(actor);
    }
};

BattleManager.refreshMoveTiles = function() {
    var select = $gameSelector.select();
    if (select) {
        $gameMap.setMoveColor();
        select.makeMoves();
    } else {
        $gameMap.clearTiles();
    }
};

BattleManager.selectActor = function(actor) {
    this._battlePhase = 'select';
    $gameSelector.updateSelect();
    this._subject = actor;
    this._subject.performSelect();
    this._actorIndex = this._subject.indexTs();
    this._subject.savePosition();
    $gameParty.setupTactics([this._subject]);
    this.refreshMoveTiles();
};

BattleManager.updateSelect = function() {
    var x = $gameSelector.x;
    var y = $gameSelector.y;
    this.refreshEnemyWindow($gameSelector.select());
    if ($gameSelector.isMoving()) {
        this._subject.refreshMovesAction(x, y);
    }
    if ($gameSelector.checkDestination(this._subject)) {
        SoundManager.playOk();
        this._battlePhase = 'move';
        $gameMap.clearTiles();
    }
    if ($gameSelector.isCancelled()) {
        SoundManager.playCancel();
        this.previousSelect();
    }
};

BattleManager.previousSelect = function() {
    this._battlePhase = 'explore';
    this._subject.restorePosition();
    var select = $gameSelector.select();
    this._subject = null;
    $gameSelector.updateSelect();
    this.refreshMoveTiles();
    var select = $gameSelector.select();
    if (select && select.isAlive()) {
        this._actorWindow.open(select);
    } else {
        this._actorWindow.close();
    }
};

BattleManager.processTarget = function() {
    this._battlePhase = 'target';
    $gameSelector.updateSelect();
};

BattleManager.updateTarget = function() {
    if ($gameSelector.isMoving()) {
        this.refreshTarget();
    }
    var action = this.inputtingAction();
    var index = $gameSelector.selectTarget(action);
    if (index >= 0) {
        action.setTarget(index);
        this.setupAction();
    }
    if ($gameSelector.isCancelled()) {
        SoundManager.playCancel();
        this.previousTarget();
    }
    BattleManager.updateTargetTeleport.call(this);
};

BattleManager.updateTargetTeleport = function() {
    var x = $gameSelector.x;
    var y = $gameSelector.y;
    var select = $gameSelector.select();
    var action = this.inputtingAction();
    if ($gameSelector.isOk()) {
        if ($gameMap.isOnTiles(x, y) && action.isTargetValid(select)) {
            if (action.isTeleport()) {
                var distance = action.evalTeleportFormula();
                var event = this._subject.event();
                $gameMap.makeRange(distance, event, true);
                $gameSelector.savePosition();
                this._battlePhase = 'tile';
            }
        }
    }
};

BattleManager.updateTile = function() {
    var x = $gameSelector.x;
    var y = $gameSelector.y;
    var select = $gameSelector.select();
    var action = this.inputtingAction();
    if ($gameSelector.isOk()) {
        if ($gameMap.isOnTiles(x, y) && !select) {
            SoundManager.playOk();
            $gameTemp.setCancel(false);
            action.setPosition(x, y);
            this.setupAction();
            $gameSelector.restorePosition();
        } else {
            SoundManager.playBuzzer();
        }
    }
    if ($gameSelector.isCancelled()) {
        SoundManager.playCancel();
        this.previousTarget();
    }
};

BattleManager.previousTarget = function() {
    SoundManager.playCancel();
    this._battlePhase = 'input';
    this.processCancel();
    this._enemyWindow.close();
    this._infoWindow.close();
};

BattleManager.inputtingAction = function() {
    return this.actor() ? this.actor().inputtingAction() : null;
};

BattleManager.refreshSubject = function() {
    var select = $gameSelector.select();
    if ($gameSelector.isMoving()) {
        this.refreshActorWindow(select);
        this.refreshEnemyWindow(select);
    }
};

BattleManager.refreshActorWindow = function(select) {
    if (select && select.isAlive() && select.isActor()) {
        this._actorWindow.open(select);
    } else {
        this._actorWindow.close();
    }
};

BattleManager.refreshEnemyWindow = function(select) {
    if (select && select.isAlive() && select.isEnemy()) {
        this._enemyWindow.open(select);
    } else {
        this._enemyWindow.close();
    }
};

BattleManager.refreshTarget = function() {
    var select = $gameSelector.select();
    if (select && select.isAlive()) {
        this._subject.turnTowardCharacter(select);
        this.refreshInfo();
    } else {
        this._enemyWindow.close();
        this._infoWindow.close();
    }
};

BattleManager.refreshInfo = function() {
    var select = $gameSelector.select();
    this.refreshEnemyWindow(select);
    var action = this.inputtingAction();
    if (action.isTargetValid(select)) {
        this._infoWindow.open(select);
    } else {
        this._infoWindow.close();
    }
};

BattleManager.closeCommand = function() {
    this._commandWindow.close();
};

BattleManager.updateStart = function() {
    var select = $gameSelector.select();
    $gameMap.setMoveColor();
    if (select) {
        select.makeRange();
    }
    if (this._phase === 'playerPhase') {
        this.updateStartPlayer();
    } else {
        this.updateStartEnemy();
    }
};

BattleManager.updateStartPlayer = function() {
    this._subject = this._playersOrder.shift();
    if (this._subject) {
        this.restrictedPhase();
    } else if ($gamePartyTs.isPhase() || !TacticsSystem.autoTurnEnd) {
        $gameSelector.setTransparent(false);
        this._battlePhase = 'explore';
    } else {
        this._battlePhase = 'turnEnd';
    }
};

BattleManager.restrictedPhase = function() {
    this._battlePhase = 'move';
    this._subject.makeMoves();
    this._subject.makeActions();
    $gameParty.setupTactics([this._subject]);
    $gameMap.clearTiles();
    var x = this._subject.tx;
    var y = this._subject.ty;
    $gameSelector.performTransfer(x, y);
};

BattleManager.updateStartEnemy = function() {
    if ($gameTroopTs.isPhase()) {
        $gameSelector.setTransparent(false);
        this.updateEnemyPhase();
    } else {
        this._battlePhase = 'turnEnd';
    }
};

BattleManager.updateEnemyPhase = function() {
    this._battlePhase = 'move';
    this._subject = this._enemiesOrder.shift();
    $gameTroop.setupTactics([this._subject]);
    this._subject.makeMoves();
    this._subject.findMoves();
    this._subject.makeActions();
    $gameMap.clearTiles();
    if (this._subject.isPattern()) {
        var x = this._subject.tx;
        var y = this._subject.ty;
        $gameSelector.performTransfer(x, y);
    }
};

BattleManager.updateMove = function() {
    if (!this._subject.isMoving()) {
        var action = this._subject.currentMove();
        if (action && action.isMove()) {
            action.applyMove();
            this._subject.nextMove();
        }
        if (!action || !action.isMove()){
            if (this._subject.canInput() && this._subject.isActor()) {
                this._battlePhase = 'input';
            } else {
                this.setupAction();
            }
        }
    }
};

BattleManager.setupAction = function() {
    $gameTemp.setCancel(false);
    this._action = this._subject.currentAction();
    if (this._action && this._action.isValid()) {
        // Make Targets here before process action.
        this.setupTarget();
    }
    this._battlePhase = 'open';
    this._actorWindow.close();
    this._enemyWindow.close();
    this._infoWindow.close();
};

BattleManager.setupTarget = function() {
    this.setupCombat(this._action);
    var subject = this._subject;
    var targets = this._action.makeTargets();
    var gameFriends = this._action.friendsUnit();
    var gameOpponents = this._action.opponentsUnit();
    if (this._action.isForFriend()) {
        gameFriends.setupTactics([this._subject].concat(targets));
        gameOpponents.setupTactics([]);
    } else {
        gameFriends.setupTactics([this._subject]);
        gameOpponents.setupTactics(targets);
    }
    this._targetIndex = -1;
    this._targets = targets;
    this.setDirectionTargets();
};

BattleManager.processAction = function() {
    var subject = this._subject;
    var action = subject.currentAction();
    this._action = action;
    if (action) {
        action.prepare();
        if (action.isValid()) {
            this.startAction();
        } else {  // last action
            this.endAction();
        }
    } else {
        this.endAction();
    }
};

BattleManager.endAction = function() {
    $gameSelector.updateSelect();
    $gameMap.clearTiles();
    $gameTemp.setCancel(true);
    var subject = this._subject;
    subject.onAllActionsEnd();
    this._logWindow.displayAutoAffectedStatus(subject);
    this._logWindow.displayCurrentState(subject);
    this._logWindow.displayRegeneration(subject);
    this._battlePhase = 'close';
};

BattleManager.updateClose = function() {
    $gameParty.setupTactics($gamePartyTs.members());
    $gameTroop.setupTactics($gameTroopTs.members());
    this._battlePhase = 'start';
    this._subject.onActionEnd();
    this._subject = null;
    this.refreshMoveTiles();
};

BattleManager.startAction = function() {
    this._battlePhase = 'action';
    this._subject.useItem(this._action.item());
    this._action.applyGlobal();
    this._logWindow.startAction(this._subject, this._action, this._targets);
};

BattleManager.updateAction = function() {
    this._targetIndex++;
    var target = this._targets[this._targetIndex];
    if (target) {
        this.turnTowardCharacter(target);
        $gameSelector.performTransfer(target.x, target.y);
        this.invokeAction(this._subject, target);
    } else {
        this._logWindow.endAction(this._subject);
        this.nextAction();
    }
};

BattleManager.setDirectionTargets = function() {
    this._targets.forEach(function(target) {
        this.turnTowardCharacter(target);
    }, this);
};

BattleManager.nextAction = function() {
    if (this._subject.canNextAction()) {
        this.processCancel();
        this._enemyWindow.close();
        this._infoWindow.close();
        this._actorWindow.open();
        this._battlePhase = 'input';
    } else {
        this.processAction();
    }
};

BattleManager.invokeAction = function(subject, target) {
    this._logWindow.push('pushBaseLine');
    if (Math.random() < this._action.itemCnt(target)) {
        this.invokeCounterAttack(subject, target);
    } else if (Math.random() < this._action.itemMrf(target)) {
        this.invokeMagicReflection(subject, target);
    } else {
        this.invokeNormalAction(subject, target);
    }
    subject.setLastTarget(target);
    this._logWindow.push('popBaseLine');
};

BattleManager.invokeNormalAction = function(subject, target) {
    var realTarget = this.applySubstitute(target);
    this._action.apply(target);
    this._logWindow.displayActionResults(subject, target);
};

BattleManager.invokeCounterAttack = function(subject, target) {
    var action = new Game_Action(target);
    action.setAttack();
    action.apply(subject);
    this._logWindow.displayCounter(target);
    this._logWindow.displayActionResults(target, subject);
};

BattleManager.invokeMagicReflection = function(subject, target) {
    this._logWindow.displayReflection(target);
    this._action.apply(subject);
    this._logWindow.displayActionResults(subject, subject);
};

BattleManager.applySubstitute = function(target) {
    if (this.checkSubstitute(target)) {
        var substitute = target.friendsUnit().substituteBattler();
        if (substitute && target !== substitute) {
            this._logWindow.displaySubstitute(substitute, target);
            return substitute;
        }
    }
    return target;
};

BattleManager.checkSubstitute = function(target) {
    return target.isDying() && !this._action.isCertainHit();
};

BattleManager.updateTurnEnd = function() {
    if (this._phase === 'playerPhase') {
        this.endPlayerPhase();
    } else {
        this.endEnemyPhase();
    }
};

BattleManager.endPlayerPhase = function() {
    this._phase = 'enemyPhase';
    this._battlePhase = 'start';
    $gameTroopTs.members().forEach(function(enemy) {
        enemy.onTurnEnd();
        this._logWindow.displayAutoAffectedStatus(enemy);
        this._logWindow.displayRegeneration(enemy);
    }, this);
    $gamePartyTs.onTurnStart();
    $gameSelector.setTransparent(true);
    $gameSelector.savePosition();
    $gameMap.clearTiles();
    this.makeEnemyOrders();
};

BattleManager.endEnemyPhase = function() {
    this._phase = 'startPhase';
    this._battlePhase = 'start';
    $gamePartyTs.members().forEach(function(actor) {
        actor.onTurnEnd();
        this._logWindow.displayAutoAffectedStatus(actor);
        this._logWindow.displayRegeneration(actor);
    }, this);
    $gameSelector.restorePosition();
    $gameSelector.setTransparent(false);
    $gameMap.clearTiles();
};

BattleManager.setupCombat = function(action) {
    var gameFriends = action.friendsUnit();
    gameFriends.setupTactics(action.combatFriendsUnit(this._subject));
    var gameOpponents = action.opponentsUnit();
    gameOpponents.setupTactics(action.combatOpponentsUnit(this._subject));
};

BattleManager.refreshRedCells = function(action) {
    $gameMap.clearTiles();
    BattleManager.setupCombat(action);
    $gameMap.setActionColor(action);
    action.showRange();
};

BattleManager.turnTowardCharacter = function(character) {
    this._subject.turnTowardCharacter(character);
    character.turnTowardCharacter(this._subject);
};

BattleManager.processCancel = function() {
    $gameMap.clearTiles();
    var x = this._subject.x;
    var y = this._subject.y;
    $gameSelector.performTransfer(x, y);
};

BattleManager.checkBattleEnd = function() {
    if (this._phase) {
        if ($gamePartyTs.isAllDead()) {
            this.processDefeat();
            return true;
        } else if ($gameTroopTs.isAllDead() && TacticsSystem.clearAll) {
            this.processVictory();
            return true;
        }
    }
    return false;
};

BattleManager.processVictory = function() {
    if (this._subject) {
        this._logWindow.endAction(this._subject);
    }
    this._actorWindow.close();
    this._enemyWindow.close();
    this._infoWindow.close();
    $gameSelector.setTransparent(true);
    $gameParty.setupTactics($gamePartyTs.members());
    $gameTroop.setupTactics($gameTroopTs.members());
    $gameParty.removeBattleStates();
    $gameParty.performVictory();
    this.playVictoryMe();
    this.replayBgmAndBgs();
    this.makeRewards();
    this.displayVictoryMessage();
    this.displayRewards();
    this.gainRewards();
    this.endBattle(0);
};

BattleManager.processDefeat = function() {
    if (this._subject) {
        this._logWindow.endAction(this._subject);
    }
    $gameSelector.setTransparent(true);
    $gameParty.setupTactics($gamePartyTs.members());
    $gameTroop.setupTactics($gameTroopTs.members());
    this.displayDefeatMessage();
    this.playDefeatMe();
    if (this._canLose) {
        this.replayBgmAndBgs();
    } else {
        AudioManager.stopBgm();
    }
    this.endBattle(2);
};

BattleManager.endBattle = function(result) {
    this.closeCommand();
    this._phase = 'battleEnd';
    $gameMap.clearTiles();
    if (this._eventCallback) {
        this._eventCallback(result);
    }
    if (result === 0) {
        $gameSystem.onBattleWin();
    } else if (this._escaped) {
        $gameSystem.onBattleEscape();
    }
};

BattleManager.playVictoryMe = function() {
    AudioManager.playMe($gameSystem.victoryMe());
};

BattleManager.playDefeatMe = function() {
    AudioManager.playMe($gameSystem.defeatMe());
};

BattleManager.makeRewards = function() {
    this._rewards = {};
    this._rewards.gold = $gameTroop.goldTotal();
    this._rewards.exp = $gameTroop.expTotal();
    this._rewards.items = $gameTroop.makeDropItems();
};

BattleManager.displayVictoryMessage = function() {
    $gameMessage.add(TextManager.victory.format($gameParty.name()));
};

BattleManager.displayDefeatMessage = function() {
    $gameMessage.add(TextManager.defeat.format($gameParty.name()));
};

BattleManager.displayRewards = function() {
    this.displayExp();
    this.displayGold();
    this.displayDropItems();
};

BattleManager.displayExp = function() {
    var exp = this._rewards.exp;
    if (exp > 0) {
        var text = TextManager.obtainExp.format(exp, TextManager.exp);
        $gameMessage.add('\\.' + text);
    }
};

BattleManager.displayGold = function() {
    var gold = this._rewards.gold;
    if (gold > 0) {
        $gameMessage.add('\\.' + TextManager.obtainGold.format(gold));
    }
};

BattleManager.displayDropItems = function() {
    var items = this._rewards.items;
    if (items.length > 0) {
        $gameMessage.newPage();
        items.forEach(function(item) {
            $gameMessage.add(TextManager.obtainItem.format(item.name));
        });
    }
};

BattleManager.gainRewards = function() {
    this.gainExp();
    this.gainGold();
    this.gainDropItems();
};

BattleManager.gainExp = function() {
    var exp = this._rewards.exp;
    $gameParty.allMembers().forEach(function(actor) {
        actor.gainExp(exp);
    });
};

BattleManager.gainGold = function() {
    $gameParty.gainGold(this._rewards.gold);
};

BattleManager.gainDropItems = function() {
    var items = this._rewards.items;
    items.forEach(function(item) {
        $gameParty.gainItem(item, 1);
    });
};

BattleManager.updateBattleEnd = function() {
    if (!this._escaped && $gameParty.isAllDead() || TacticsSystem.isDefeated) {
        if (this._canLose) {
            $gameParty.reviveBattleMembers();
            SceneManager.pop();
        } else {
            SceneManager.goto(Scene_Gameover);
        }
    } else {
        SceneManager.pop();
    }
    this._phase = null;
    this.terminate();
};

BattleManager.onAllTurnEnd = function() {
    this._battlePhase = 'turnEnd';
    $gamePartyTs.onAllTurnEnd();
};

BattleManager.terminate = function() {
    $gameScreen.onBattleEnd();
    $gamePlayer.setThrough(false);
    $gamePlayer.refresh();
    $gamePartyTs.onBattleEnd();
    $gameTroopTs.onBattleEnd();
};

BattleManager.clear = function() {
    $gameSwitches.setValue(TacticsSystem.battleStartId, false);
    $gamePartyTs.onClear();
    $gameTroopTs.onClear();
};

//-----------------------------------------------------------------------------
// Game_Screen
//
// The game object class for screen effect data, such as changes in color tone
// and flashes.

TacticsSystem.Game_Screen_clear = Game_Screen.prototype.clear;
Game_Screen.prototype.clear = function() {
    TacticsSystem.Game_Screen_clear.call(this);
    this._battleStart = true;
};

TacticsSystem.Game_Screen_onBattleStart = Game_Screen.prototype.onBattleStart;
Game_Screen.prototype.onBattleStart = function() {
    TacticsSystem.Game_Screen_onBattleStart.call(this);
    this.clearStart();
};

Game_Screen.prototype.clearStart = function() {
    this._startDuration = this._battleStart ? TacticsSystem.durationStartSprite : 0;
    this._battleStart = false;
};

Game_Screen.prototype.startDuration = function() {
    return this._startDuration;
};

TacticsSystem.Game_Screen_update = Game_Screen.prototype.update;
Game_Screen.prototype.update = function() {
    TacticsSystem.Game_Screen_update.call(this);
    this.updateStart();
};

Game_Screen.prototype.updateStart = function() {
    if (this._startDuration > 0) {
        this._startDuration--;
    }
};

Game_Screen.prototype.onBattleEnd = function() {
    this._battleStart = true;
    if (TacticsSystem.fadeOutEnd) {
        this.startFadeOut(this.fadeSpeed());
    }
};

Game_Screen.prototype.fadeSpeed = function() {
    return 24;
};

//-----------------------------------------------------------------------------
// Game_Temp
//
// The game object class for temporary data that is not included in save data.

TacticsSystem.Game_Temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    TacticsSystem.Game_Temp_initialize.call(this);
    this._positionX = null;
    this._positionY = null;
    this._direction = null;
    this._canCancel = true;
};

Game_Temp.prototype.isPositionValid = function(x, y) {
    this._positionX = x;
    this._positionY = y;
};

Game_Temp.prototype.setPosition = function(x, y) {
    this._positionX = x;
    this._positionY = y;
};

Game_Temp.prototype.setDirection = function(d) {
    this._direction = d;
};

Game_Temp.prototype.direction = function() {
    return this._direction;
};

Game_Temp.prototype.clearDirection = function() {
    this._direction = null;
};

Game_Temp.prototype.clearPosition = function() {
    this._positionX = null;
    this._positionY = null;
};

Game_Temp.prototype.isPositionValid = function() {
    return this._positionX !== null;
};

Game_Temp.prototype.positionX = function() {
    return this._positionX;
};

Game_Temp.prototype.positionY = function() {
    return this._positionY;
};

Game_Temp.prototype.canCancel = function() {
    return this._canCancel;
};

Game_Temp.prototype.setCancel = function(canCancel) {
    this._canCancel = canCancel;
};

//-----------------------------------------------------------------------------
// Game_Switches
//
// The game object class for switches.

Game_Switches.prototype.update = function() {
    this.updatePhase();
};

Game_Switches.prototype.updatePhase = function() {
    this.setValue(TacticsSystem.playerPhaseId, false);
    this.setValue(TacticsSystem.enemyPhaseId, false);
    switch (BattleManager.phase()) {
    case 'playerPhase':
        this.setValue(TacticsSystem.playerPhaseId, true);
        break;
    case 'enemyPhase':
        this.setValue(TacticsSystem.enemyPhaseId, true);
        break
    }
};

//-----------------------------------------------------------------------------
// Game_Variables
//
// The game object class for variables.

Game_Variables.prototype.update = function() {
    this.updatePhase();
    this.updatePlayerPhase();
    this.updateBattlePhase();
    this.updateTurnCount();
};

Game_Variables.prototype.updatePhase = function() {
    switch (BattleManager.phase()) {
    case 'startPhase':
        var value = 1;
        break;
    case 'playerPhase':
        var value = 2;
        break;
    case 'enemyPhase':
        var value = 3;
        break
    // can't to be used
    case 'battleEnd':
        var value = 4;
        break;
    default:
        var value = 0;
        break;
    }
    this.setValue(TacticsSystem.phaseVarId, value);
};

Game_Variables.prototype.updatePlayerPhase = function() {
    switch (BattleManager.battlePhase()) {
    case 'explore':
        var value = 1;
        break;
    case 'select':
        var value = 2;
        break;
    case 'target':
        var value = 3;
        break
    default:
        var value = 0;
        break;
    }
    this.setValue(TacticsSystem.playerPhaseVarId, value);
};

Game_Variables.prototype.updateBattlePhase = function() {
    switch (BattleManager.battlePhase()) {
    case 'start':
        var value = 1;
        break;
    case 'move':
        var value = 2;
        break;
    case 'action':
        var value = 3;
        break
    case 'turnEnd':
        var value = 4;
        break;
    default:
        var value = 0;
        break;
    }
    this.setValue(TacticsSystem.battlePhaseVarId, value);
};

Game_Variables.prototype.updateTurnCount = function() {
    this.setValue(TacticsSystem.turnCountVarId, $gameTroop.turnCount());
};

//-----------------------------------------------------------------------------
// Game_Action
//
// The game object class for a battle action.

TacticsSystem.Game_Action_initialize = Game_Action.prototype.initialize;
Game_Action.prototype.initialize = function(subject, forcing) {
    TacticsSystem.Game_Action_initialize.call(this, subject, forcing);
    this._moveRoute = 0;
    this._positionX = -1;
    this._positionY = -1;
};

TacticsSystem.Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
    TacticsSystem.Game_Action_apply.call(this, target);
    var result = target.result();
    var effect = this.item().meta['Effect'];
    if (result.isHit() && effect) {
        effect.trim().split(',').forEach(function(effect) {
            this.applyMetaEffect(target, effect);
        }, this);
    }
};

TacticsSystem.Game_Action_testApply = Game_Action.prototype.testApply;
Game_Action.prototype.testApply = function(target) {
    return ((this.testLifeAndDeath(target) && this.isForOpponent()) || 
             TacticsSystem.Game_Action_testApply.call(this, target)  || this.isTeleport());
};

Game_Action.prototype.combatOpponentsUnit = function(battler) {
    var units = battler.opponentsUnitTS().aliveMembers();
    var battlers = this.searchBattlers(battler, units);
    return battlers;
};

Game_Action.prototype.combatFriendsUnit = function(battler) {
    var friends = battler.friendsUnitTS().aliveMembers();
    var battlers = [battler]; // first for the user keeps the same index !
    if (this.isForFriend()) {
        battlers = battlers.concat(this.searchBattlers(battler, friends));
    }
    return battlers;
};

Game_Action.prototype.searchBattlers = function(battler, units) {
    var battlers = [];
    var item = this.item();
    if (this.isAttackRange(battler)) {
        item = battler.weapons()[0] || battler.weapons()[1];
    }
    this.updateRange(item, battler.tx, battler.ty);
    for (var i = 0; i < this._range.length; i++) {
        var redCell = this._range[i];
        var x = redCell[0];
        var y = redCell[1];
        for (var j = 0; j < units.length; j++) {
            if (units[j].pos(x, y) && units[j] !== battler) {
                battlers.push(units[j]);
            }
        }
    }
    return battlers;
};

Game_Action.prototype.isAttackRange = function (subject) {
    return subject.isActor() && this.isAttack() && !subject.hasNoWeapons();
};

Game_Action.prototype.updateRange = function(item, x, y) {
    var data = this.extractRangeData(item);
    // range: 10 -> range: 0 10
    if (data[1] === undefined) {
        data[1] = data[0];
        data[0] = 0;
    }
    // range: 
    if (data[2] === undefined) {
        data[2] = 'diamond';
    }
    this._range = this.createRange(parseInt(data[0]), parseInt(data[1]), x, y, data[2]);
    if (this.isForUser()) {
        this._range = [[x, y]];
    }
};

Game_Action.prototype.extractRangeData = function (object) {
    var data = object.meta['Range'] || TacticsSystem.actionRange;
    return data.trim().split(' ');
};

Game_Action.prototype.createRange = function(d1, d2, x, y, shape) {
    var range = [];
    for (var i = x - d2; i <= x + d2; i++) {
        for (var j = y - d2; j <= y + d2; j++) {
            if (Math.abs(i - x) + Math.abs(j - y) > d1) {
                switch (shape) {
                case 'diamond':
                    if (Math.abs(i - x) + Math.abs(j - y) <= d2) {
                       range.push([i, j]);
                    }
                    break;
                case 'rectangle':
                    range.push([i, j]);
                    break;
                case 'line':
                    if (i === x || j === y) {
                        range.push([i, j]);
                    }
                    break;
                }
            }
        }
    }
    return range;
};

Game_Action.prototype.range = function() {
    return this._range;
};

Game_Action.prototype.showRange = function() {
    this._range.forEach(function(pos) {
        var tile = $gameMap.tile(pos[0], pos[1]);
        $gameMap.addTile(tile);
    }, this)
};

Game_Action.prototype.color = function() {
    return this.isForFriend() ? TacticsSystem.allyScopeColor : TacticsSystem.enemyScopeColor;
}

Game_Action.prototype.testDamageMinMaxValue = function(target, minMax) {
    var item = this.item();
    var baseValue = this.evalDamageFormula(target);
    var value = baseValue * this.calcElementRate(target);
    if (this.isPhysical()) {
        value *= target.pdr;
    }
    if (this.isMagical()) {
        value *= target.mdr;
    }
    if (baseValue < 0) {
        value *= target.rec;
    }
    value = this.testMinMaxVariance(value, item.damage.variance, minMax);
    value = this.applyGuard(value, target);
    value = Math.round(value);
    return value;
};

Game_Action.prototype.testMinMaxVariance = function(damage, variance, minMax) {
    var amp = Math.floor(Math.max(Math.abs(damage) * variance / 100, 0));
    var v = minMax ? amp : - amp;
    return damage >= 0 ? damage + v : damage - v;
};

Game_Action.prototype.setMove = function(moveRoute) {
    this._moveRoute = moveRoute;
};

Game_Action.prototype.applyMove = function() {
    var command = { code : this._moveRoute };
    var event = this.subject().event();
    event.processMoveCommand(command);
};

Game_Action.prototype.isTargetValid = function(battler) {
    if (this.isForOpponent()) {
        return battler && !battler.isActor();
    } else {
        return battler && battler.isActor();
    }
};

Game_Action.prototype.isMove = function() {
    return this._moveRoute !== 0;
};

Game_Action.prototype.setWait = function() {
    this.setSkill(this.subject().waitSkillId());
};

Game_Action.prototype.isWait = function() {
    return this.item() === $dataSkills[this.subject().waitSkillId()];
};

TacticsSystem.Game_Action_subject = Game_Action.prototype.subject;
Game_Action.prototype.subject = function() {
    TacticsSystem.Game_Action_subject.call(this);
    if ($gamePartyTs.inBattle()) {
        if (this._subjectActorId <= 0) {
            return $gameTroopTs.members()[this._subjectEnemyIndex];
        }
    }
    return TacticsSystem.Game_Action_subject.call(this);
};

TacticsSystem.Game_Action_setSubject = Game_Action.prototype.setSubject;
Game_Action.prototype.setSubject = function(subject) {
    TacticsSystem.Game_Action_setSubject.call(this, subject);
    // For enemy restriction attack an ally...
    if ($gamePartyTs.inBattle()) {
        if (!subject.isActor()) {
            this._subjectEnemyIndex = $gameTroopTs.members().indexOf(subject);
        }
    }
};

Game_Action.prototype.isTileTarget = function() {
    return this.item().meta['target'];
};

Game_Action.prototype.setPosition = function(x, y) {
    this._positionX = x;
    this._positionY = y;
};

Game_Action.prototype.isTeleport = function() {
    if (this.item()) {
        var param = this.item().meta['Effect'];
        if (param) {
            return param.trim() === 'Teleport';
        }
    }
    return false;
};

Game_Action.prototype.evalTeleportFormula = function(target) {
    try {
        var item = this.item();
        var a = this.subject();
        var b = this.makeTargets().shift() || null;
        var v = $gameVariables._data;
        var value = Math.max(eval(item.meta['Formula'] || TacticsSystem.teleportFormula), 0);
        if (isNaN(value)) value = 0;
        return value;
    } catch (e) {
        return 0;
    }
};

Game_Action.prototype.applyMetaEffect = function(target, effect) {
    switch (effect) {
    case 'Teleport':
        this.itemEffectTeleport(target, effect);
        break;
    }
};

Game_Action.prototype.itemEffectTeleport = function(target, effect) {
    target.setPosition(this._positionX, this._positionY);
    this.makeSuccess(target);
};
/* this needed if Tactics_Combat.js is used to overwrite that method
TacticsSystem.Game_Action_needCombatScene = Game_Action.prototype.needCombatScene;
Game_Action.prototype.needCombatScene = function() {
    return TacticsSystem.Game_Action_needCombatScene.call(this) && !this.isTeleport();
};
*/

//-----------------------------------------------------------------------------
// Game_BattlerBase
//
// The superclass of Game_Battler. It mainly contains parameters calculation.

Game_BattlerBase.TRAIT_TPARAM = 71;

Game_BattlerBase.TPARAM  = {
    'Move': 0,
};

Game_BattlerBase.prototype.move = function() {
    return Math.max((Number(this.tparam('Move')) || TacticsSystem.mvp) +
            this.traitsSum(Game_BattlerBase.TRAIT_TPARAM, 0), 1);
};

Game_BattlerBase.prototype.tparamCode = function(tparam) {
    return Game_BattlerBase.TPARAM[tparam];
};

Game_BattlerBase.prototype.tparamTraits = function() {
    return this.traitObjects().reduce(function(r, obj) {
        return r.concat(this.noteTraits(obj));
    }.bind(this), []);
};

Game_BattlerBase.prototype.noteTraits = function(obj) {
    var value = obj.meta['MoveMod']; // <MoveMod:1> / <MoveMod:-2>
    var trait = [];
    if(value){
        arg = Number(value);
        if(!isNaN(arg)) {
            trait = {
                'code':   Game_BattlerBase.TRAIT_TPARAM,
                'dataId': Game_BattlerBase.TPARAM['Move'],
                'value':  arg
            };
        }
    } else { // check for old style / note tag for downwards compatibility, will be removed in later version
        value = obj.meta['Ts-Parameter']; // <Ts-Parameter: Move +1> / <Ts-Parameter: Move -2>
        if (value !== undefined) {
            var args = value.trim().split(' ');
            var trait = {
                'code':   Game_BattlerBase.TRAIT_TPARAM,
                'dataId': Game_BattlerBase.TPARAM[args[0]],
                'value':  eval(args[1])
            }
        } 
    }
    
    return trait;
};

TacticsSystem.Game_BattlerBase_allTraits = Game_BattlerBase.prototype.allTraits;
Game_BattlerBase.prototype.allTraits = function() {
    return TacticsSystem.Game_BattlerBase_allTraits.call(this).concat(this.tparamTraits());
};

TacticsSystem.Game_BattlerBase_canUse = Game_BattlerBase.prototype.canUse;
Game_BattlerBase.prototype.canUse = function(item) {
    if ($gamePartyTs.inBattle()) {
        if (!this.isItemRangeValid(item)) {
            return false;
        }
    }
    return TacticsSystem.Game_BattlerBase_canUse.call(this, item);
};

Game_BattlerBase.prototype.isOccasionOk = function(item) {
    if ($gameParty.inBattle() || $gamePartyTs.inBattle()) {
        return item.occasion === 0 || item.occasion === 1;
    } else {
        return item.occasion === 0 || item.occasion === 2;
    }
};

Game_BattlerBase.prototype.waitSkillId = function() {
    return TacticsSystem.waitSkillId;
};

//-----------------------------------------------------------------------------
// Game_Battler
//
// The superclass of Game_Actor and Game_Enemy. It contains methods for sprites
// and actions.

Object.defineProperties(Game_Battler.prototype, {
    // event position X
    x: { get: function() { return this.event().x; }, configurable: true },
    // event position Y
    y: { get: function() { return this.event().y; }, configurable: true },
    // Tactical position X
    tx: { get: function() { return this._tx; }, configurable: true },
    // Tactical position Y
    ty: { get: function() { return this._ty; }, configurable: true },
    // MoVe Point
    mvp: { get: function() { return this.move(); }, configurable: true }
});

TacticsSystem.Game_Battler_initMembers = Game_Battler.prototype.initMembers;
Game_Battler.prototype.initMembers = function() {
    TacticsSystem.Game_Battler_initMembers.call(this);
    this._tx = 0;
    this._ty = 0;
    this._eventId = 0;
    this._char = new Game_Character();  // it's used to calculate the shortest path
    this._actionIndex = 0;
    this._moveIndex = 0;
    this._moves = [];
    this._canAction = true;
    this._active = false;
    this._requestImage = false;
};

Game_Battler.prototype.setupEvent = function(eventId) {
    this._eventId = eventId;
    var event = this.event()
    this._tx = event.x;
    this._ty = event.y;
    event.setBattler(this);
};

Game_Battler.prototype.indexTs = function() {
    return -1;
};

Game_Battler.prototype.clearEvent = function() {
    this._eventId = 0;
    this._tx = 0;
    this._ty = 0;
};

Game_Battler.prototype.event = function() {
    return $gameMap.event(this._eventId);
};

Game_Battler.prototype.dataEvent = function() {
    return this.event().event();  // stange method...
};

Game_Battler.prototype.pos = function(x, y) {
    return this.event().pos(x, y);
};

Game_Battler.prototype.currentBattler = function() {
    return null;
};

Game_Battler.prototype.currentData = function() {
    return [this.currentBattler(), this.dataEvent()];
};

Game_Battler.prototype.tparam = function(paramString) {
    var param = null;
    for (var i = 0; i < this.currentData().length; i++) {
        param = this.currentData()[i].meta[paramString]
        if (param) {
            break;
        }
    }
    if (param) {
        param.replace(/\s/g, '');
    }
    return param;
};

Game_Battler.prototype.onTurnStart = function() {
    if (this.isRestricted) {
        this._canAction = true;
        this.event().setStepAnime(true);
    }
    this.makeActions();
    this.makeMoves();
};

Game_Battler.prototype.onActionEnd = function() {
    this._canAction = false;
};

Game_Battler.prototype.isMoving = function() {
    return this.event().isMoving();
};

Game_Battler.prototype.turnTowardCharacter = function(character) {
    this.event().turnTowardCharacter(character)
};

Game_Battler.prototype.isItemRangeValid = function(item) {
    if (!item) {
        return false;
    } else if (DataManager.isSkill(item)) {
        return this.isSkillRangeOk(item);
    } else if (DataManager.isItem(item)) {
        return this.isItemRangeOk(item);
    } else {
        return false;
    }
};

Game_Battler.prototype.isSkillRangeOk = function(item) {
    var action = new Game_Action(this);
    action.setSkill(item.id);
    if (this.isConfused()) {
        return this.isConfusedRangeOk(action);
    } if (action.isForOpponent()) {
        return action.combatOpponentsUnit(this).length > 0;
    }
    if (action.isForFriend()) {
        return action.combatFriendsUnit(this).length > 0;
    }
    return false;
};

Game_Battler.prototype.isItemRangeOk = function(item) {
    var action = new Game_Action(this);
    action.setItem(item.id);
    if (action.isForOpponent()) {
        return action.combatOpponentsUnit(this).length > 0;
    }
    if (action.isForFriend()) {
        return action.combatFriendsUnit(this).length > 0;
    }
    return false;
};

Game_Battler.prototype.nextAction = function() {
    this._actionIndex++;
    if (this._actionIndex < this.numActions()) {
        return true;
    } else {
        return false;
    }
};

TacticsSystem.Game_Battler_currentAction = Game_Battler.prototype.currentAction;
Game_Battler.prototype.currentAction = function() {
    if ($gamePartyTs.inBattle()) {
         return this._actions[this._actionIndex];
    } else {
        return TacticsSystem.Game_Battler_currentAction.call(this);
    }
};

TacticsSystem.Game_Battler_clearActions = Game_Battler.prototype.clearActions;
Game_Battler.prototype.clearActions = function() {
    TacticsSystem.Game_Battler_clearActions.call(this);
    this._actionIndex = 0;
};

Game_Battler.prototype.currentMove = function() {
    return this._moves[this._moveIndex];
};

Game_Battler.prototype.nextMove = function() {
    this._moveIndex++;
    if (this._moveIndex <= this.numMoves()) {
        return true;
    } else {
        return false;
    }
};

Game_Battler.prototype.numMoves = function() {
    return this._moves.length;
};

Game_Battler.prototype.makeMoves = function() {
    this.clearMoves();
    if (this.canMove()) {
        var moveTimes = this.makeMoveTimes();
        this._moves = [];
        for (var i = 0; i < moveTimes; i++) {
            this._moves.push(new Game_Action(this));
        }
    }
    this.makeRange();
    if (this.isRestricted()) {
        this.makeConfusionMove()
    }
};

Game_Battler.prototype.makeMoveTimes = function() {
    return this.mvp;
};

Game_Battler.prototype.clearMoves = function() {
    this._tx = this.x;
    this._ty = this.y;
    this._moves = [];
    this._moveIndex = 0;
};

Game_Battler.prototype.refreshMovesAction = function(x, y) {
    if ($gameMap.isOnTiles(x, y)) {
        this.makeMoves();
        this._tx = x;
        this._ty = y;
        this.makeShortestMoves();
    } else {
        this.makeMoves();
    }
};

Game_Battler.prototype.makeShortestMoves = function() {
    this._char.setPosition(this.x, this.y);
    var index = 0;
    while (!this.tpos() && index < this.numMoves()) {
        var d = this._char.findDirectionTo(this.tx, this.ty);
        this._char.moveStraight(d);
        this._moves[index].setMove(d / 2);
        index++;
    }
    this._tx = this._char.x;
    this._ty = this._char.y;
};

Game_Battler.prototype.tpos = function() {
    return this.tx === this._char.x && this.ty === this._char.y;
}

Game_Battler.prototype.canAction = function() {
    return $gamePartyTs.inBattle() ? this._canAction : true;
};

Game_Battler.prototype.makeRange = function() {
    $gameMap.makeRange(this.numMoves(), this.event());
};

Game_Battler.prototype.makeConfusionMove = function() {
    var action = new Game_Action(this);
    action.setConfusion();
    $gameMap.makeRange(this.mvp, this.event());
    var targets = [new Point(this.x, this.y)];
    for (var i = 0; i < $gameMap.tiles().length; i++) {
        var tile = $gameMap.tiles()[i];
        this._tx = $gameMap.positionTileX(tile);
        this._ty = $gameMap.positionTileY(tile);
        if (this.canUse(action.item())) {
            // actor can't use action in another actor
            if ($gameMap.eventsXy(this.tx, this.ty).length === 0) {
                targets.push({'x': this.tx, 'y': this.ty});
            }
        }
    }
    $gameMap.clearTiles();
    var target = targets[Math.randomInt(targets.length)];
    this._tx = target['x'];
    this._ty = target['y'];
};

Game_Battler.prototype.isConfusedRangeOk = function(action) {
    switch (this.confusionLevel()) {
    case 1:
        return action.combatOpponentsUnit(this).length > 0;
    case 2:
        return action.combatOpponentsUnit(this).length > 0 ||
            action.combatFriendsUnit(this).length > 1;  // don't count self
    default:
        return action.combatFriendsUnit(this).length > 1;
    }
};

Game_Battler.prototype.performCollapse = function() {
    this.event().setThrough(true);
};

Game_Battler.prototype.performSelect = function() {
    this.requestEffect('whiten');
};

Game_Battler.prototype.setPosition = function(x, y) {
    this.event().setPosition(x, y);
    this._tx = x;
    this._ty = y;
};

Game_Battler.prototype.canNextAction = function() {
    // next action in first for game enemy get next action!
    return this.nextAction() && this.isActor() && !this.isAutoBattle();
};

Game_Battler.prototype.onClear = function() {
    if (TacticsSystem.setTransparentUnit) {
        this.event().setTransparent(true);
        this.event().setThrough(true);
    }
};

//-----------------------------------------------------------------------------
// Game_Actor
//
// The game object class for an actor.

TacticsSystem.Game_Actor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
    TacticsSystem.Game_Actor_initMembers.call(this);
    this._actionsButton = [];
};

Game_Actor.prototype.currentData = function() {
    return Game_Battler.prototype.currentData.call(this).concat(this.currentClass());
};

Game_Actor.prototype.setupEvent = function(eventId) {
    Game_Battler.prototype.setupEvent.call(this, eventId);
    this.event().setPriorityType(1);
    // to find a path to through an actor
    this._char.setIsActor(true);
};

Game_Actor.prototype.currentBattler = function() {
    return this.actor();
};

Game_Actor.prototype.indexTs = function() {
    return $gamePartyTs.members().indexOf(this);
};

Game_Actor.prototype.friendsUnitTS = function() {
    return $gamePartyTs;
};

Game_Actor.prototype.opponentsUnitTS = function() {
    return $gameTroopTs;
};

Game_Actor.prototype.savePosition = function() {
    $gameTemp.setPosition(this.x, this.y);
    $gameTemp.setDirection(this.event().direction());
};

Game_Actor.prototype.restorePosition = function() {
    var positionX = $gameTemp.positionX();
    var positionY = $gameTemp.positionY();
    this.event().setPosition(positionX, positionY);
    this.event().setDirection($gameTemp.direction());
    this._tx = positionX;
    this._ty = positionY;
};

Game_Actor.prototype.refreshImage = function() {
    this.event().setImage(this.characterName(), this.characterIndex());
};

Game_Actor.prototype.actionsButton = function() {
    return this._actionsButton;
};

Game_Actor.prototype.canActionButton = function() {
    return this.checkEventTriggerThere();
};

Game_Actor.prototype.checkEventTriggerThere = function() {
    this._actionsButton = []
    for (var d = 8; d >= 2; d -= 2) {
        var x1 = this.x;
        var y1 = this.y;
        var x2 = $gameMap.roundXWithDirection(x1, d);
        var y2 = $gameMap.roundYWithDirection(y1, d);
        this.checkEventsTriggerHere(x2, y2);
    }
    return this._actionsButton.length > 0;
};

Game_Actor.prototype.checkEventsTriggerHere = function(x, y) {
    if (!$gameMap.isEventRunning()) {
        var events = $gameMap.eventsXy(x, y);
        for (var i = 0; i < events.length; i++) {
            var event = events[i];
            if (event.page()) {
                var list = event.list();
                if (event.isTriggerIn([0]) && list && list.length > 1) {
                    this._actionsButton.push(event.eventId());
                }
            }
        }
    }
};

Game_Actor.prototype.checkEventTriggerTouch = function() {
    if (!$gameMap.isEventRunning()) {
        return $gameMap.eventsRangeXy(this.x, this.y).some(function(event) {
            if (event.isTriggerIn([1,2])) {
                event.start();
                return true;
            }
            return false;
        });
    }
    return false;
};

TacticsSystem.Game_Actor_inputtingAction = Game_Actor.prototype.inputtingAction;
Game_Actor.prototype.inputtingAction = function() {
    if ($gamePartyTs.inBattle()) {
        return this.action(this._actionIndex);
    } else {
        return TacticsSystem.Game_Actor_inputtingAction.call(this);
    }
};

TacticsSystem.Game_Actor_performCollapse = Game_Actor.prototype.performCollapse;
Game_Actor.prototype.performCollapse = function() {
    TacticsSystem.Game_Actor_performCollapse.call(this);
    this.requestEffect('bossCollapse');
};

TacticsSystem.Game_Actor_isBattleMember = Game_Actor.prototype.isBattleMember;
Game_Actor.prototype.isBattleMember = function() {
    if ($gamePartyTs.inBattle()) {
        return $gamePartyTs.members().contains(this);
    } else {
        return TacticsSystem.Game_Actor_isBattleMember.call(this);
    }
};

Game_Actor.prototype.makeMoves = function() {
    Game_Battler.prototype.makeMoves.call(this);
    if (!this.isRestricted() && this.isAutoBattle()) {
        this.autoMoves();
    }
};

Game_Actor.prototype.autoMoves = function() {
    this.makeAutoBattleMoves();
    this.makeShortestMoves();
};

Game_Actor.prototype.makeAutoBattleMoves = function() {
    var saveX = this.tx;
    var saveY = this.ty;
    $gameMap.makeRange(16, this.event());
    var maxValue = Number.MIN_VALUE;
    for (var i = 0; i < $gameMap.tiles().length; i++) {
        var tile = $gameMap.tiles()[i];
        this._tx = $gameMap.positionTileX(tile);
        this._ty = $gameMap.positionTileY(tile);
        var list = this.makeActionList();
        var value = 0;
        for (var j = 0; j < list.length; j++) {
            value += list[j].evaluate();
        }
        if (value > maxValue) {
            maxValue = value;
            saveX = this.tx;
            saveY = this.ty;
        }
    }
    $gameMap.clearTiles();
    this._tx = saveX;
    this._ty = saveY;
};

Game_Actor.prototype.onActionEnd = function() {
    Game_Battler.prototype.onActionEnd.call(this);
    this.event().setStepAnime(true);
};

//-----------------------------------------------------------------------------
// Game_Enemy
//
// The game object class for an enemy.

Object.defineProperties(Game_Enemy.prototype, {
    // AGGressivity
    agg: { get: function() { return this.tparam('Aggro') || 99; }, configurable: true }
});

Game_Enemy.prototype.currentBattler = function() {
    return this.enemy();
};

Game_Enemy.prototype.friendsUnitTS = function() {
    return $gameTroopTs;
};

Game_Enemy.prototype.opponentsUnitTS = function() {
    return $gamePartyTs;
};

Game_Enemy.prototype.indexTs = function() {
    return $gameTroopTs.members().indexOf(this);
};

Game_Enemy.prototype.makeMoves = function() {
    Game_Battler.prototype.makeMoves.call(this);
};

Game_Enemy.prototype.findMoves = function() {
    if (!this.isConfused()) {
        this.findPosition();
    }
    this.makeShortestMoves();
};

Game_Enemy.prototype.findPosition = function() {
    // Rewrite this if you want to change the target search behavior.
    this._rate = 0;
    var saveX = this.tx;
    var saveY = this.ty;
    $gameMap.makeRange(this.agg, this.event());
    for (var i = 0; i < $gameMap.tiles().length; i++) {
        var tile = $gameMap.tiles()[i];
        this._tx = $gameMap.positionTileX(tile);
        this._ty = $gameMap.positionTileY(tile);
        var actionList = this.enemy().actions.filter(function(a) {
            return this.isActionValid(a);
        }, this);
        var sum = actionList.reduce(function(r, a) {
            return r + a.rating;
        }, 0);
        if (sum > this._rate) {
            this._rate = sum;
            saveX = this.tx;
            saveY = this.ty;
        }
    }
    $gameMap.clearTiles();
    this._tx = saveX;
    this._ty = saveY;
};

Game_Enemy.prototype.isPattern = function() {
    return this._rate > 0;
};

Game_Enemy.prototype.applyMove = function() {
    var action = this.currentMove();
    if (action) {
        action.applyMove();
    }
};

//-----------------------------------------------------------------------------
// Game_Unit
//
// The superclass of Game_Party and Game_Troop.

TacticsSystem.Game_Unit_onBattleStart = Game_Unit.prototype.onBattleStart;
Game_Unit.prototype.onBattleStart = function() {
    TacticsSystem.Game_Unit_onBattleStart.call(this);
    if ($gamePartyTs.inBattle()) {
        this._inBattle = false;
    }
};

//-----------------------------------------------------------------------------
// Game_Party
//
// The game object class for the party. Information such as gold and items is
// included.

Game_Party.prototype.setupTactics = function(actors) {
    var actorsId = [];
    for (var i = 0; i < actors.length; i++) {
        if (actorsId.indexOf(actors[i].actorId()) < 0) {
            actorsId.push(actors[i].actorId());
        }
    }
    this._maxBattleMembers = actorsId.length;
    actorsId.forEach(function(actorId) {
        if (this._actors.contains(actorId)) {
            this.removeActor(actorId);
        }
    }, this);
    this._actors = actorsId;
};


Game_Party.prototype.setMaxBattleMembers = function() {
    this._maxBattleMembers = this.allMembers().length;
};

Game_Party.prototype.maxBattleMembers = function() {
    return $gamePartyTs.inBattle() ? this._maxBattleMembers : 4;
};

Game_Party.prototype.members = function() {
    return this.inBattle() || $gamePartyTs.inBattle() ? this.battleMembers() : this.allMembers();
};

Game_Party.prototype.memberId = function(partyId) {
    return this.members()[partyId - 1].actorId();
};

//-----------------------------------------------------------------------------
// Game_Troop
//
// The game object class for a troop and the battle-related data.

Game_Troop.prototype.setupTactics = function(enemies) {
    this._enemies = [];
    enemies.forEach(function(member) {
        if (member && !member.isBattleMember()) {
            this._enemies.push(member);
        }
    }, this)
};

TacticsSystem.Game_Troop_meetsConditions = Game_Troop.prototype.meetsConditions;
Game_Troop.prototype.meetsConditions = function(page) {
    var c = page.conditions;
    if (c.enemyValid) {
        var enemy = $gameTroopTs.members()[c.enemyIndex];
        if (!enemy || enemy.hpRate() * 100 > c.enemyHp) {
            return false;
        }
        if (!c.turnEnding && !c.turnValid && !c.actorValid && !c.switchValid) {
            return true;  // Only enemy valid
        }
    } else {
        page.conditions.enemyValid = false;
        return TacticsSystem.Game_Troop_meetsConditions.call(this, page);
    }
};

//-----------------------------------------------------------------------------
// Game_Map
//
// The game object class for a map. It contains scrolling and passage
// determination functions.

TacticsSystem.Game_Map_intialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function() {
    TacticsSystem.Game_Map_intialize.call(this);
    this._tiles = [];
    this._color = '';
    this._destinationX = null;
    this._destinationY = null;
};

Game_Map.prototype.addTile = function(tile) {
    this._tiles.push(tile);
};

Game_Map.prototype.positionTileX = function(tile) {
    return tile % $dataMap.width;
};

Game_Map.prototype.positionTileY = function(tile) {
    return Math.floor(tile / $dataMap.width);
};

Game_Map.prototype.isTileAdded = function(tile) {
    return this._tiles.contains(tile);
};

Game_Map.prototype.tile = function(x, y) {
    return y * $dataMap.width + x;
};

Game_Map.prototype.tiles = function() {
    return this._tiles;
};

Game_Map.prototype.clearTiles = function() {
    this._tiles = [];
};

Game_Map.prototype.isOnTiles = function(x, y) {
    return this._tiles.contains(this.tile(x, y));
};

Game_Map.prototype.setMoveColor = function() {
    this._color = TacticsSystem.moveScopeColor;
};

Game_Map.prototype.setActionColor = function(action) {
    this._color = action.color();
};

Game_Map.prototype.color = function() {
    return this._color;
};

Game_Map.prototype.performScroll = function(x, y) {
    var x = Math.floor(Math.min(x, $gameMap.width() - this.screenTileX() / 2));
    var y = Math.floor(Math.min(y, $gameMap.height() - this.screenTileY() / 2));
    this._destinationX = Math.round(Math.max(x - this.screenTileX() / 2, 0));
    this._destinationY = Math.round(Math.max(y - this.screenTileY() / 2, 0));
    this._scrollSpeed = 5;
};

Game_Map.prototype.clearDestination = function() {
    this._destinationX = null;
    this._destinationY = null;
};

Game_Map.prototype.isDestinationValid = function() {
    return this._destinationX !== null;
};

TacticsSystem.Game_Map_updateScroll = Game_Map.prototype.updateScroll;
Game_Map.prototype.updateScroll = function() {
    if (this.isDestinationValid()) {
        var x = Math.max(this._displayX, 0);
        var y = Math.max(this._displayY, 0);
        if (y < this._destinationY) {
            var d = Math.min(this._destinationY - y, this.scrollDistance());
            $gameMap.scrollDown(d);
        }
        if (x > this._destinationX) {
            var d = Math.min(x - this._destinationX, this.scrollDistance());
            $gameMap.scrollLeft(d);
        }
        if (x < this._destinationX) {
            var d = Math.min(this._destinationX - x, this.scrollDistance());
            $gameMap.scrollRight(d);
        }
        if (y > this._destinationY) {
            var d = Math.min(y - this._destinationY, this.scrollDistance());
            $gameMap.scrollUp(d);
        }
        if (x === this._destinationX && y === this._destinationY) {
            this.clearDestination();
        }
    } else {
        TacticsSystem.Game_Map_updateScroll.call(this);
    }
};

Game_Map.prototype.makeRange = function(distance, event, through) {
    if (through === undefined) {
        through = false;
    }
    var queue = [];
    var level = [];
    var tiles = [];
    var startTile = this.tile(event.x, event.y)
    
    this.clearTiles();
    queue.push(startTile);
    level[startTile] = 0;
    this.addTile(startTile);

    while (queue.length && level[queue[0]] < distance) {
        var start = queue.shift();
        var x = this.positionTileX(start);
        var y = this.positionTileY(start);
        for (var d = 8; d >= 2; d -= 2) {
            if (event.canPass(x, y, d) || through) {
                var x2 = this.roundXWithDirection(x, d);
                var y2 = this.roundYWithDirection(y, d);
                var tile = this.tile(x2, y2);
                if (!tiles.contains(tile)) {
                    queue.push(tile);
                    level[tile] = level[start] + 1;
                    tiles.push(tile)
                    if ($gameMap.isPassableTile(x2, y2)) {
                        this.addTile(tile);
                    }
                }
            }
        }
    }
};

Game_Map.prototype.eventsRangeXy = function(tx, ty) {
    return this.events().filter(function(event) {
        var x = event.x;
        var y = event.y;
        var d = Number(event.tparam('range')) || 1;
        for (var i = x - d; i <= x + d; i++) {
            for (var j = y - d; j <= y + d; j++) {
                if (Math.abs(i - x) + Math.abs(j - y) <= d) {
                    if (tx === i && ty === j) {
                        return true
                    }
                }
            }
        }
        return false;
    }, tx, ty);
};

Game_Map.prototype.isPassableTile = function(x, y) {
    for (var i = 0; i < 4; i++) {
        var direction = 2 + i * 2;
        if ($gameMap.isPassable(x, y, direction)) {
            return true;
        }
    }
    return false;
};

//-----------------------------------------------------------------------------
// Game_CharacterBase
//
// The superclass of Game_Character. It handles basic information, such as
// coordinates and images, shared by all characters.

Game_CharacterBase.prototype.setIsActor = function(isActor) {
    this._isActor = isActor;
};

Game_CharacterBase.prototype.isActor = function() {
    return this._isActor;
};

TacticsSystem.Game_CharacterBase_isCollidedWithEvents = Game_CharacterBase.prototype.isCollidedWithEvents;
Game_CharacterBase.prototype.isCollidedWithEvents = function(x, y) {
    // for an actor to pass through an actor
    if (this.isActor()) {
        var events = $gameMap.eventsXyNt(x, y);
        return events.some(function(event) {
            return event.isNormalPriority() && !event.isActor();
        });
    } else {
         return TacticsSystem.Game_CharacterBase_isCollidedWithEvents.call(this, x, y);
    }
};

Game_CharacterBase.prototype.requestAnimation = function (animationId) {
    this._animationId = animationId;
};

//-----------------------------------------------------------------------------
// Game_Character
//
// The superclass of Game_Player, Game_Follower, GameVehicle, and Game_Event.

Game_Character.prototype.searchLimit = function() {
    return 32; // 12 by default
};

//-----------------------------------------------------------------------------
// Game_Event
//
// The game object class for an event. It contains functionality for event page
// switching and running parallel process events.

TacticsSystem.Game_Event_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
    TacticsSystem.Game_Event_initMembers.call(this);
    this._battlerId = null;
    this._actor = null;
};

Game_Event.prototype.setBattler = function(battler) {
    this._battler = battler;
};

Game_Event.prototype.isActor = function() {
    return this._battler && this._battler.isActor();
};

Game_Event.prototype.isEnemy = function() {
    return this._battler && this._battler.isEnemy();
};


// in a perfect world Game_Battler inherits from Game Event ;-)
Game_Event.prototype.battler = function() {
    return this._battler;
};

Game_Event.prototype.setActor = function(actor) {
    this._actor = actor;
};

Game_Event.prototype.tparam = function(paramString) {
    var param = this.event().meta[paramString];
    if (typeof param === 'string') {
        param = param.replace(/\s/g, '');
    }
    return param
};

TacticsSystem.Game_Event_isCollidedWithEvents = Game_Event.prototype.isCollidedWithEvents;
Game_Event.prototype.isCollidedWithEvents = function(x, y) {
    // for an actor to pass through an actor
    if (this.isActor() || this.isEnemy()) {
        return Game_Character.prototype.isCollidedWithEvents.call(this, x, y)
    } else {
         return TacticsSystem.Game_Event_isCollidedWithEvents.call(this, x, y);
    }
};

Game_Event.prototype.isAppeared = function() {
    return this.findProperPageIndex() !== -1 && !this._erased;
};

TacticsSystem.Game_Event_update = Game_Event.prototype.update;
Game_Event.prototype.update = function() {
    this.updateAppeared();
    TacticsSystem.Game_Event_update.call(this);
};

Game_Event.prototype.updateAppeared = function() {
    if (this.isActor() || this.isEnemy()) {
        if (this.isAppeared()) {
            this._battler.appear();
        } else {
            this._battler.hide();
        }
    }
};

Game_Event.prototype.name = function() {
    return this.tparam('Name') || this.event().name;
};

//-----------------------------------------------------------------------------
// Game_Selector
//
// The game object class for the selector.

function Game_Selector() {
    this.initialize.apply(this);
}

Game_Selector.prototype.constructor = Game_Selector;

Object.defineProperties(Game_Selector.prototype, {
    x: { get: function() { return this._x; }, configurable: true },
    y: { get: function() { return this._y; }, configurable: true }
});

Game_Selector.prototype.initialize = function() {
    this.initMembers();
};

Game_Selector.prototype.initMembers = function() {
    this._x = 0;
    this._y = 0;
    this._realX = 0;
    this._realY = 0;
    this._direction = 0;
    this._speed = TacticsSystem.selectorSpeed + 3 || 5;
    this._wait = 0;
    this._selectIndex = -1;
    this._isMoving = false;
    this._transparent = false;
    this._scrolledX = 0;
    this._scrolledY = 0;
    this._active = true;
    this._reachedDest = false;
};

Game_Selector.prototype.pos = function(x, y) {
    return this.x === x && this.y === y;
};

Game_Selector.prototype.setPosition = function(x, y) {
    this._realX = this._x = x;
    this._realY = this._y = y;
};

Game_Selector.prototype.isWaiting = function() {
    return this._wait > 0;
};

Game_Selector.prototype.activate = function() {
    this._active = true;
};

Game_Selector.prototype.deactivate = function() {
    this._active = false;
};

Game_Selector.prototype.select = function() {
    return this.battlers()[this._selectIndex];
};

Game_Selector.prototype.isMoving = function() {
    return this._isMoving;
};

Game_Selector.prototype.getInputDirection = function() {
    return Input.dir4;
};

Game_Selector.prototype.updateMoveByInput = function() {
    if (BattleManager.isActive()) {
        this.moveByInput();
    }
};

Game_Selector.prototype.update = function() {
    this._isMoving = false;
    this.moveByDestination();
    this.updateMove();
    // don't update scrool here if destination...
    if (!$gameMap.isDestinationValid()) {
        this.updateScroll(this._scrolledX, this._scrolledY);
    }
    this.updateWait();
    this._scrolledX = this.scrolledX();
    this._scrolledY = this.scrolledY();
};

Game_Selector.prototype.distancePerFrame = function() {
    return Math.pow(2, this._speed) / 256;
};

Game_Selector.prototype.updateWait = function() {
    if (this.isWaiting()) {
        this._wait -= this.distancePerFrame();
    }
};

Game_Selector.prototype.canMove = function() {
    return !$gameMap.isEventRunning() && !$gameMessage.isBusy() &&
        this._active;
};

Game_Selector.prototype.moveByInput = function() {
    var direction = this.getInputDirection();
    if (this.canMove() && !this.isWaiting() && direction > 0) {
        var x = $gameMap.roundXWithDirection(this.x, direction);
        var y = $gameMap.roundYWithDirection(this.y, direction);
        if (this.isValid(x, y)) {
            SoundManager.playCursor();
            this.executeMove(x, y, direction);
            this.updateSelect();
        }
    }
};

Game_Selector.prototype.moveByDestination = function() {
    if (this.canMove() && !this.isWaiting() && $gameTemp.isDestinationValid()) {
        var x = $gameTemp.destinationX();
        var y = $gameTemp.destinationY();
        direction = this.findDirectionTo(x, y);
        if (direction > 0) {
            x = $gameMap.roundXWithDirection(this.x, direction);
            y = $gameMap.roundYWithDirection(this.y, direction);
            this.executeMove(x, y, direction);
            this.updateSelect();
        } else {
            this._isMoving = true;
            this._reachedDest = true;
            $gameTemp.clearDestination();
        }
    }
};

Game_Selector.prototype.findDirectionTo = function(x, y) {
    if (this.y < y) {
        return 2;
    }
    if (this.x > x) {
        return 4;
    }
    if (this.x < x) {
        return 6;
    }
    if (this.y > y) {
        return 8;
    }
    return 0;
};

Game_Selector.prototype.executeMove = function(x, y, direction) {
    this._wait = 1;
    this._isMoving = true;
    this._x = x;
    this._y = y;
    this._direction = direction;
};

Game_Selector.prototype.performTransfer = function(x, y) {
    $gameMap.performScroll(x, y);
    this._x = this._realX = x;
    this._y = this._realY = y;
    this.updateSelect();
};

Game_Selector.prototype.isValid = function(x, y) {
    return x >= 0 && y >= 0 && x < $gameMap.width() && y < $gameMap.height();
};

Game_Selector.prototype.updateMove = function() {
    if (this._x < this._realX) {
        this._realX = Math.max(this._realX - this.distancePerFrame(), this._x);
    }
    if (this._x > this._realX) {
        this._realX = Math.min(this._realX + this.distancePerFrame(), this._x);
    }
    if (this._y < this._realY) {
        this._realY = Math.max(this._realY - this.distancePerFrame(), this._y);
    }
    if (this._y > this._realY) {
        this._realY = Math.min(this._realY + this.distancePerFrame(), this._y);
    }
};

Game_Selector.prototype.battlers = function() {
    return $gamePartyTs.members().concat($gameTroopTs.members());
};

Game_Selector.prototype.updateSelect = function() {
    this._selectIndex = -1;
    for (var i = 0; i < this.battlers().length; i++) {
        var battler = this.battlers()[i];
        if (this.pos(battler.x, battler.y)) {
            if (battler.isAlive()) {
                this._selectIndex = i;
            }
        }
    }
};

Game_Selector.prototype.updateScroll = function(lastScrolledX, lastScrolledY) {
    var x1 = lastScrolledX;
    var y1 = lastScrolledY;
    var x2 = this.scrolledX();
    var y2 = this.scrolledY();
    if (y2 > y1 && y2 > this.centerY()) {
        $gameMap.scrollDown(y2 - y1);
    }
    if (x2 < x1 && x2 < this.centerX()) {
        $gameMap.scrollLeft(x1 - x2);
    }
    if (x2 > x1 && x2 > this.centerX()) {
        $gameMap.scrollRight(x2 - x1);
    }
    if (y2 < y1 && y2 < this.centerY()) {
        $gameMap.scrollUp(y1 - y2);
    }
};

Game_Selector.prototype.centerX = function() {
    return (Graphics.width / $gameMap.tileWidth() - 1) / 2.0;
};

Game_Selector.prototype.centerY = function() {
    return (Graphics.height / $gameMap.tileHeight() - 1) / 2.0;
};

Game_Selector.prototype.moveTo = function(x, y) {
    $gameTemp.setDestination(x, y);
};

Game_Selector.prototype.savePosition = function() {
    $gameTemp.setPosition(this.x, this.y);
};

Game_Selector.prototype.restorePosition = function() {
    if ($gameTemp.isPositionValid()) {
        var positionX = $gameTemp.positionX();
        var positionY = $gameTemp.positionY();
        this.performTransfer(positionX, positionY);
    }
};

Game_Selector.prototype.scrolledX = function() {
    return $gameMap.adjustX(this._realX);
};

Game_Selector.prototype.scrolledY = function() {
    return $gameMap.adjustY(this._realY);
};

Game_Selector.prototype.screenX = function() {
    var tw = $gameMap.tileWidth();
    return Math.round($gameMap.adjustX(this.x) * tw);
};

Game_Selector.prototype.screenY = function() {
    var th = $gameMap.tileHeight();
    return Math.round($gameMap.adjustY(this.y) * th);
};

Game_Selector.prototype.isOk = function() {
    return Input.isTriggered('ok') || this.triggerTouchAction();
};

Game_Selector.prototype.isCancelled = function() {
    return Input.isTriggered('menu') || TouchInput.isCancelled();
};

Game_Selector.prototype.triggerTouchAction = function() {
    if (this._reachedDest) {
        this._reachedDest = false;
        return true;
    }
    return false;
};

Game_Selector.prototype.setTransparent = function(transparent) {
    this._transparent = transparent;
};

Game_Selector.prototype.isTransparent = function() {
    return this._transparent;
};

Game_Selector.prototype.isBusy = function() {
    return ($gameMap.isDestinationValid() || $gameTemp.isDestinationValid());
};

Game_Selector.prototype.selectActor = function() {
    var select = this.select()
    if (select && select.isActor() && select.canAction()) {
        if (this.isOk()) {
            SoundManager.playOk();
            return select;
        }
    }
};

Game_Selector.prototype.checkDestination = function(subject) {
    var battler = this.select();
    if ($gameMap.isOnTiles(this.x, this.y)) {
        if (!battler || subject === battler) {
            if (this.isOk()) {
                return true;
            }
        }
    }
    return false;
};

Game_Selector.prototype.selectTarget = function(action) {
    var select = this.select();
    if ($gameSelector.isOk()) {
        if ($gameMap.isOnTiles(this.x, this.y) && action.isTargetValid(select)) {
            SoundManager.playOk();
            return select.index();
        } else {
            SoundManager.playBuzzer();
        }
    }
    return -1;
};

//-----------------------------------------------------------------------------
// Game_Interpreter
//
// The interpreter for running event commands.

TacticsSystem.Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
Game_Interpreter.prototype.updateWaitMode = function() {
    var waiting = false;
    switch (this._waitMode) {
    case 'TacticsSystem.battle':
        waiting = SceneManager.isCurrentScene(Scene_Battle) || SceneManager.isSceneChanging();
        break;
    case 'TacticsSystem.selector':
        waiting = $gameSelector.isBusy();
        break;
    default:
        return TacticsSystem.Game_Interpreter_updateWaitMode.call(this);
    }
    if (!waiting) {
        if (this._waitMode === 'TacticsSystem.battle') {
            BattleManager.clear();
        }
        this._waitMode = '';
    }
    return waiting;
};

TacticsSystem.Game_Interpreter_iterateEnemyIndex = Game_Interpreter.prototype.iterateEnemyIndex;
Game_Interpreter.prototype.iterateEnemyIndex = function(param, callback) {
    if ($gamePartyTs.inBattle()) {
        if (param < 0) {
            $gameTroopTs.members().forEach(callback);
        } else {
            var enemy = $gameTroopTs.members()[param];
            if (enemy) {
                callback(enemy);
            }
        }
    } else {
        TacticsSystem.Game_Interpreter_iterateEnemyIndex.call(this, param, callback);
    }
};

// Battle Processing
TacticsSystem.Game_Interpreter_command301 = Game_Interpreter.prototype.command301;
Game_Interpreter.prototype.command301 = function(params) {
    Game_Interpreter.prototype.setWaitMode.call(this, 'TacticsSystem.battle');
    return TacticsSystem.Game_Interpreter_command301.call(this, params);
};

//-----------------------------------------------------------------------------
// Game_UnitTs
//
// The superclass of Game_PartyTs and Game_TroopTs.

function Game_UnitTs() {
    this.initialize.apply(this, arguments);
}

Game_UnitTs.prototype.initialize = function() {
    this._inBattle = false;
};

Game_UnitTs.prototype.members = function() {
    return [];
};

Game_UnitTs.prototype.updateActive = function() {
    this.members().forEach(function(member) {
        member.updateActive();
    });
};

Game_UnitTs.prototype.aliveMembers = function() {
    return this.members().filter(function(member) {
        return member.isAlive();
    });
};

Game_UnitTs.prototype.isAllDead = function() {
    return this.aliveMembers().length === 0;
};

Game_UnitTs.prototype.onTurnStart = function() {
    this.members().forEach(function(member) {
        member.onTurnStart();
    });
};

Game_UnitTs.prototype.canActionMembers = function() {
    return this.aliveMembers().filter(function(member) {
        return member.canAction();
    });
};

Game_UnitTs.prototype.isPhase = function() {
    return this.canActionMembers().length > 0;
};

Game_UnitTs.prototype.onClear = function() {
    this.members().forEach(function(member) {
        member.onClear();
    });
};

//-----------------------------------------------------------------------------
// Game_PartyTs
//
// The game object class for a party tactics.

function Game_PartyTs() {
    this.initialize.apply(this, arguments);
}

Game_PartyTs.prototype = Object.create(Game_UnitTs.prototype);
Game_PartyTs.prototype.constructor = Game_PartyTs;

Game_PartyTs.prototype.initialize = function() {
    Game_UnitTs.prototype.initialize.call(this);
    this.clear();
};

Game_PartyTs.prototype.members = function() {
    return this._actors.map(function(id) {
        return $gameActors.actor(id);
    });
};

Game_PartyTs.prototype.clear = function() {
    this._actors = [];
    this._maxBattleMembers = 0;
    this._inBattle = false;
};

Game_PartyTs.prototype.maxBattleMembers = function() {
    return this._maxBattleMembers;
};

Game_PartyTs.prototype.addActor = function(actorId, event, needRefresh) {
    if (!this._actors.contains(actorId)) {
        var actor = $gameActors.actor(actorId);
        var eventId = event.eventId();
        actor.setupEvent(eventId);
        this._maxBattleMembers++;
        this._actors.push(actorId);
        if (needRefresh) {
            actor.refreshImage();
        }
    }
};

Game_PartyTs.prototype.actors = function() {
    return this._actors;
};

Game_PartyTs.prototype.removeActor = function() {
};

Game_PartyTs.prototype.onBattleStart = function() {
    this._inBattle = true;
    $gameParty.onBattleStart();
};

Game_PartyTs.prototype.inBattle = function() {
    return this._inBattle;
};

Game_PartyTs.prototype.allMembers = function() {
    return this._actors.map(function(id) {
        return $gameActors.actor(id);
    });
};

Game_PartyTs.prototype.restrictedMembers = function() {
    return this.members().filter(function(member) {
        return (member.isRestricted() || member.isAutoBattle()) && member.isAlive();
    }, this);
};

Game_PartyTs.prototype.onAllTurnEnd = function() {
    this.aliveMembers().forEach(function(actor) {
        actor.onActionEnd();
    });
};

Game_PartyTs.prototype.onBattleEnd = function() {
    $gameParty.onBattleEnd();
    this._inBattle = false;
};

Game_PartyTs.prototype.onClear = function() {
    Game_UnitTs.prototype.onClear.call(this);
    this._actors = [];
};

//-----------------------------------------------------------------------------
// Game_TroopTs
//
// The game object class for a troop tactic.

function Game_TroopTs() {
    this.initialize.apply(this, arguments);
}

Game_TroopTs.prototype = Object.create(Game_UnitTs.prototype);
Game_TroopTs.prototype.constructor = Game_TroopTs;

Game_TroopTs.prototype.initialize = function() {
    Game_UnitTs.prototype.initialize.call(this);
    this.clear();
};

Game_TroopTs.prototype.clear = function() {
    this._enemies = [];
};

Game_TroopTs.prototype.addEnemy = function(enemyId, event) {
    var enemy = new Game_Enemy(enemyId);
    var eventId = event.eventId();
    this._enemies.push(enemy);
    enemy.setupEvent(eventId);
};

Game_TroopTs.prototype.addTroop = function(index, event) {
    var enemy = $gameTroop.members()[index-1];
    var eventId = event.eventId();
    this._enemies.splice(index-1, 0, enemy);
    enemy.setupEvent(eventId);
};

Game_TroopTs.prototype.onBattleStart = function() {
    $gameTroop.onBattleStart();
};

Game_TroopTs.prototype.members = function() {
    return this._enemies.slice(0);
};

Game_TroopTs.prototype.battleMembers = function() {
    return this.members().filter(function(enemy) {
        return enemy.isAlive();
    });
};

Game_TroopTs.prototype.onBattleEnd = function() {
    $gameTroop.onBattleEnd();
};

Game_TroopTs.prototype.onClear = function() {
    Game_UnitTs.prototype.onClear.call(this);
    this._enemies = [];
};


//-----------------------------------------------------------------------------
// Scene_Map
//
// The scene class of the map screen.

//TacticsSystem.Scene_Map_launchBattle = Scene_Map.prototype.launchBattle;
Scene_Map.prototype.launchBattle = function() {
    BattleManager.saveBgmAndBgs();
    this.stopAudioOnBattleStart();
    SoundManager.playBattleStart();
    this._encounterEffectDuration = this.encounterEffectSpeed();
    this._mapNameWindow.hide();
};

Scene_Map.prototype.updateEncounterEffect = function() {
     if (this._encounterEffectDuration > 0) {
        this._encounterEffectDuration--;
        var timer = this._encounterEffectDuration;
        var startTimer = this.encounterEffectSpeed();
        if (timer === startTimer - 1) {
            this.startFadeOut(this.slowFadeSpeed());
        }
        if (timer === Math.floor(startTimer / 2)) {
            BattleManager.playBattleBgm();
        }
        if (timer === 1) {
            BattleManager.createGameObjects();
        }
    }
};

//TacticsSystem.Scene_Map_encounterEffectSpeed = Scene_Map.prototype.encounterEffectSpeed;
Scene_Map.prototype.encounterEffectSpeed = function() {
    return 180;
};

//-----------------------------------------------------------------------------
// Sprite_Selector
//
// The sprite for displaying a selector.

function Sprite_Selector() {
    this.initialize.apply(this, arguments);
};

Sprite_Selector.prototype = Object.create(Sprite.prototype);
Sprite_Selector.prototype.constructor = Sprite_Selector;

Sprite_Selector.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this.loadBitmap();
};

Sprite_Selector.prototype.loadBitmap = function() {
    this.bitmap = ImageManager.loadSystem(TacticsSystem.selectorFile);
};

Sprite_Selector.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updateVisibility();
    this.x = $gameSelector.screenX();
    this.y = $gameSelector.screenY();
};

Sprite_Selector.prototype.updateVisibility = function() {
    Sprite.prototype.updateVisibility.call(this);
    this.visible = !$gameSelector.isTransparent();
};

//-----------------------------------------------------------------------------
// Sprite_Grid
//
// The sprite for displaying a grid.

function Sprite_Grid() {
    this.initialize.apply(this, arguments);
};

Sprite_Grid.prototype = Object.create(Sprite.prototype);
Sprite_Grid.prototype.constructor = Sprite_Grid;

Sprite_Grid.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this.setFrame(0, 0, Graphics.width, Graphics.height);
    this.createBitmap();
    this.z = 1;
    this.opacity = TacticsSystem.gridOpacity || 30;
};

Sprite_Grid.prototype.createBitmap = function() {
    var width = $gameMap.width();
    var height = $gameMap.height();
    this.bitmap = new Bitmap(width * 48, height * 48);
    for (var x = 0; x < width; x++) {
        this.bitmap.drawLine(48 * x, 0, 48 * x, height * 48);
    }
    for (var y = 0; y < height; y++) {
        this.bitmap.drawLine(0, 48 * y, width * 48, 48 * y);
    }
};

Sprite_Grid.prototype.update = function() {
    Sprite.prototype.update.call(this);
    var screen = $gameScreen;
    var scale = screen.zoomScale();
    this.scale.x = scale;
    this.scale.y = scale;
    this.x = Math.round($gameMap.adjustX(0) * 48);
    this.y = Math.round($gameMap.adjustY(0) * 48);
    this.x += Math.round(screen.shake());
};

//-----------------------------------------------------------------------------
// Spriteset_Tactics
//
// The set of sprites on the tactics screen.

function Spriteset_Tactics() {
    this.initialize.apply(this, arguments);
}

Spriteset_Tactics.prototype = Object.create(Spriteset_Map.prototype);
Spriteset_Tactics.prototype.constructor = Spriteset_Tactics;

Spriteset_Tactics.prototype.initialize = function() {
    Spriteset_Map.prototype.initialize.call(this);
    this.createSelector();
    this.createStart();
    this.createGrid();
    this._sign = 1;
};

Spriteset_Tactics.prototype.findTargetSprite = function(target) {
    if(target instanceof Game_Event){ // is GameVehicle needed?
        return Spriteset_Map.prototype.findTargetSprite.call(this, target); 
    }
    if(target instanceof Game_Player){ 
        target = BattleManager.actor();
    }
    return this.battlerSprites().find(sprite => sprite.checkBattler(target));
};

Spriteset_Tactics.prototype.createLowerLayer = function() {
    Spriteset_Map.prototype.createLowerLayer.call(this);
    this.createBaseTiles();
};

Spriteset_Tactics.prototype.createBaseTiles = function() {
    this._tilesSprite = new Sprite();
    this._tilesSprite.z = 1;
    this._rangeTilesSprite = this.createTiles(TacticsSystem.moveScopeColor);
    this._tilemap.addChild(this._tilesSprite);
};

Spriteset_Tactics.prototype.createSelector = function() {
    this._selectorSprite = new Sprite_Selector();
    this._selectorSprite.z = 1;
    this._tilemap.addChild(this._selectorSprite);
};

Spriteset_Tactics.prototype.createTiles = function(color) {
    var tilesSprite = new Sprite();
    var width = $gameMap.width();
    var height = $gameMap.height();
    tilesSprite.bitmap = new Bitmap(width * 48, height * 48);
    tilesSprite.opacity = 120;
    tilesSprite.color = color;
    this._tilesSprite.addChild(tilesSprite);
    return tilesSprite
};

Spriteset_Tactics.prototype.updateRangeTiles = function() {
    this._rangeTiles = $gameMap.tiles();
    var width = $gameMap.width();
    var height = $gameMap.height();
    this._rangeTilesSprite.bitmap.clearRect(0, 0, width * 48, height * 48);
    this._rangeTilesSprite.color = $gameMap.color();
    this._rangeTiles.forEach(function(tile) {
        var x = $gameMap.positionTileX(tile) * 48;
        var y = $gameMap.positionTileY(tile) * 48;
        var color = this._rangeTilesSprite.color;
        this._rangeTilesSprite.bitmap.fillRect(x + 2, y + 2, 44, 44, color);
    }, this);
};

Spriteset_Tactics.prototype.updateTiles = function() {
    if (this._tilesSprite.opacity >= 255) {
        this.sign = -1;
    }
    if (this._tilesSprite.opacity <= 160) {
        this.sign = 1;
    }
    if (this._rangeTiles !== $gameMap.tiles()) {
        this.updateRangeTiles();
    }
    this._tilesSprite.opacity = this._tilesSprite.opacity + 3 * this.sign;
    this._tilesSprite.x = $gameScreen.zoomScale();
    this._tilesSprite.y = $gameScreen.zoomScale();
    this._tilesSprite.x = Math.round($gameMap.adjustX(0) * 48);
    this._tilesSprite.y = Math.round($gameMap.adjustY(0) * 48);
    this._tilesSprite.x += Math.round($gameScreen.shake());
};

Spriteset_Tactics.prototype.createCharacters = function() {
    this._characters = [];
    this._characterSprites = [];
    this._actorSprites = [];
    this._enemySprites = [];
    $gameMap.events().forEach(function(event) {
        var sprite = null;
        if (event.isActor() || event.isEnemy()) {
            sprite = new Sprite_BattlerTs(event);
        } else {
            sprite = new Sprite_Character(event);
        }
        this._characters.push(event);
        this._characterSprites.push(sprite);
        if (event.isActor()) {
            this._actorSprites.push(sprite);
        }
        if (event.isEnemy()) {
            this._enemySprites.push(sprite);
        }
    }, this);
    for (var i = 0; i < this._characterSprites.length; i++) {
        this._tilemap.addChild(this._characterSprites[i]);
    }
};

Spriteset_Tactics.prototype.createEnemies = function() {
    this._enemySprites = [];
    this._characters.forEach(function(event) {
        if (sprite.isEnemy()) {
            this._enemySprites.push(sprite);
        }
    }, this);
};

Spriteset_Tactics.prototype.battlerSprites = function() {
    return this._enemySprites.concat(this._actorSprites);
};

Spriteset_Tactics.prototype.createGrid = function() {
    this._tilemap.addChild(new Sprite_Grid());
};

Spriteset_Tactics.prototype.update = function() {
    Spriteset_Map.prototype.update.call(this);
    this.updateTiles();
};

Spriteset_Tactics.prototype.isBusy = function() {
    return this.isAnimationPlaying() || this.isAnyoneMoving();
};

Spriteset_Tactics.prototype.isAnimationPlaying = function() {
    return (this._animationSprites.length > 0) || (TacticsSystem.showBattleStart && this._startSprite.isPlaying());
};

Spriteset_Tactics.prototype.isAnyoneMoving = function() {
    for (var i = 0; i < this._characters.length; i++) {
        if (this._characters[i].isMoving()) {
            return true;
        }
    }
    return false;
};

Spriteset_Tactics.prototype.createStart = function() {
    if(!TacticsSystem.showBattleStart) return;
    this._startSprite = new Sprite_Start();
    this.addChild(this._startSprite);
};

Spriteset_Tactics.prototype.isEffecting = function() {
    return this.battlerSprites().some(function(sprite) {
        return sprite.isEffecting();
    });
};

//-----------------------------------------------------------------------------
// Sprite_BattlerTs
//
// The sprite for displaying a battler.

function Sprite_BattlerTs() {
    this.initialize.apply(this, arguments);
};

Sprite_BattlerTs.prototype = Object.create(Sprite_Character.prototype);
Sprite_BattlerTs.prototype.constructor = Sprite_BattlerTs;

//overwrite all
Sprite_BattlerTs.prototype.initialize = function(character) {
    Sprite_Character.prototype.initialize.call(this, character);
    this._damages = [];
    this._appeared = false;
    this._shake = 0;  // unused
    this._effectType = null;
    this._effectDuration = 0;
    this._battler = character.battler();
    this.createStateIconSprite();
    if (TacticsSystem.showHpGauge) {
        this.createHpGaugeSprite();
    }
    // if the battler's dead and back on the tactical scene.
    if (!character.battler().isAlive()) {
        this.opacity = 0;
    }
};

//overwrite all
Sprite_BattlerTs.prototype.update = function() {
    Sprite_Character.prototype.update.call(this);
    this.updateDamagePopup();
    this.updateColor();
    this.updateEffect();
};

// overwrite base class: Sprite_Character
Sprite_BattlerTs.prototype.updateOther = function() {
    if (this._battler.isAlive()) {
        Sprite_Character.prototype.updateOther.call(this);
    }
};

//new methods
Sprite_BattlerTs.prototype.createHpGaugeSprite = function() {
    this._hpGaugeSprite = new Sprite_HpGauge(this._battler);
    this._hpGaugeSprite.z = this.z;
    this.addChild(this._hpGaugeSprite);
};

Sprite_BattlerTs.prototype.isActor = function() {
    return this._character.isActor();
};

Sprite_BattlerTs.prototype.isEnemy = function() {
    return this._character.isEnemy();
};

Sprite_BattlerTs.prototype.isChangeColor = function() {
    return this._battler.isActor && this._battler.canAction() && !this._battler.isRestricted();
};

Sprite_BattlerTs.prototype.updateColor = function() {
    if (this.isChangeColor()) {
        this.setColorTone([0, 0, 0, 0]);
    } else {
        this.setColorTone([0, 0, 0, 255]);
    }
};

// import from Sprite_Battler
Sprite_BattlerTs.prototype.updateDamagePopup = function() {
    this.setupDamagePopup();
    if (this._damages.length > 0) {
        for (var i = 0; i < this._damages.length; i++) {
            this._damages[i].update();
        }
        if (!this._damages[0].isPlaying()) {
            this.parent.removeChild(this._damages[0]);
            this._damages.shift();
        }
    }
};

Sprite_BattlerTs.prototype.setupDamagePopup = function() {
    if (this._battler.isDamagePopupRequested()) {
        var sprite = new Sprite_Damage();
        sprite.x = this.x + this.damageOffsetX();
        sprite.y = this.y + this.damageOffsetY();
        sprite.z = this.z + 1;
        sprite.setup(this._battler);
        this._damages.push(sprite);
        this.parent.addChild(sprite);
        this._battler.clearDamagePopup();
        this._battler.clearResult();
    }
};

Sprite_BattlerTs.prototype.checkBattler = function(battler) {
    return this._battler === battler;
};

// import from Sprite_Battler, overwrite from Sprite_Enemy
Sprite_BattlerTs.prototype.isEffecting = function() {
    return this._effectType !== null;
};

// import from Sprite_Battler, Sprite_Enemy, Sprite_Actor
Sprite_BattlerTs.prototype.damageOffsetX = function() {
    return 24;
};

// Sprite_Battler, Sprite_Enemy, Sprite_Actor
Sprite_BattlerTs.prototype.damageOffsetY = function() {
    return 24;
};

// Sprite_Enemy
Sprite_BattlerTs.prototype.createStateIconSprite = function() {
    this._stateIconSprite = new Sprite_StateIcon();
    this._stateIconSprite.setup(this._battler);
    this._stateIconSprite.y = -5;
    this._stateIconSprite.x = 15;
    this._stateIconSprite.z = this.z;
    this._stateIconSprite.scale.x = 0.6;
    this._stateIconSprite.scale.y = 0.6;
    this.addChild(this._stateIconSprite);
};

// Sprite_Enemy
Sprite_BattlerTs.prototype.initVisibility = function() {
    this._appeared = this._battler.isAlive();
    if (!this._appeared) {
        this.opacity = 0;
    }
};

// Sprite_Enemy
Sprite_BattlerTs.prototype.setupEffect = function() {
    if (this._appeared && this._battler.isEffectRequested()) {
        this.startEffect(this._battler.effectType());
        this._battler.clearEffect();
    }
    if (!this._appeared && this._battler.isAlive()) {
        this.startEffect('appear');
    } else if (this._appeared && this._battler.isHidden()) {
        this.startEffect('disappear');
    }
};

// Sprite_Enemy
Sprite_BattlerTs.prototype.startEffect = function(effectType) {
    this._effectType = effectType;
    switch (this._effectType) {
    case 'appear':
        this.startAppear();
        break;
    case 'disappear':
        this.startDisappear();
        break;
    case 'whiten':
        this.startWhiten();
        break;
    case 'blink':
        this.startBlink();
        break;
    case 'collapse':
        this.startCollapse();
        break;
    case 'bossCollapse':
        this.startBossCollapse();
        break;
    case 'instantCollapse':
        this.startInstantCollapse();
        break;
    }
    this.revertToNormal();
};

// Sprite_Enemy
Sprite_BattlerTs.prototype.startAppear = function() {
    this._effectDuration = 16;
    this._appeared = true;
};

// Sprite_Enemy
Sprite_BattlerTs.prototype.startDisappear = function() {
    this._effectDuration = 32;
    this._appeared = false;
};

// Sprite_Enemy
Sprite_BattlerTs.prototype.startWhiten = function() {
    this._effectDuration = 16;
};

// Sprite_Enemy
Sprite_BattlerTs.prototype.startBlink = function() {
    this._effectDuration = 20;
};

// Sprite_Enemy
Sprite_BattlerTs.prototype.startCollapse = function() {
    this._effectDuration = 32;
    this._appeared = false;
};

// Sprite_Enemy
Sprite_BattlerTs.prototype.startBossCollapse = function() {
    this._effectDuration = 60;
    this._appeared = false;
};

// Sprite_Enemy
Sprite_BattlerTs.prototype.startInstantCollapse = function() {
    this._effectDuration = 16;
    this._appeared = false;
};

// Sprite_Enemy
Sprite_BattlerTs.prototype.updateEffect = function() {
    this.setupEffect();
    if (this._effectDuration > 0) {
        this._effectDuration--;
        switch (this._effectType) {
        case 'whiten':
            this.updateWhiten();
            break;
        case 'blink':
            this.updateBlink();
            break;
        case 'appear':
            this.updateAppear();
            break;
        case 'disappear':
            this.updateDisappear();
            break;
        case 'collapse':
            this.updateCollapse();
            break;
        case 'bossCollapse':
            this.updateBossCollapse();
            break;
        case 'instantCollapse':
            this.updateInstantCollapse();
            break;
        }
        if (this._effectDuration === 0) {
            this._effectType = null;
        }
    }
};

// Sprite_Enemy
Sprite_BattlerTs.prototype.revertToNormal = function() {
    this._shake = 0;
    this.blendMode = 0;
    this.opacity = 255;
    this.setBlendColor([0, 0, 0, 0]);
};

// Sprite_Enemy
Sprite_BattlerTs.prototype.updateWhiten = function() {
    var alpha = 128 - (16 - this._effectDuration) * 10;
    this.setBlendColor([255, 255, 255, alpha]);
};

// Sprite_Enemy
Sprite_BattlerTs.prototype.updateBlink = function() {
    this.opacity = (this._effectDuration % 10 < 5) ? 255 : 0;
};

// Sprite_Enemy
Sprite_BattlerTs.prototype.updateAppear = function() {
    this.opacity = (16 - this._effectDuration) * 16;
};

// Sprite_Enemy
Sprite_BattlerTs.prototype.updateDisappear = function() {
    this.opacity = 256 - (32 - this._effectDuration) * 10;
};

// Sprite_Enemy
Sprite_BattlerTs.prototype.updateCollapse = function() {
    this.blendMode =1;
    this.setBlendColor([255, 128, 128, 128]);
    this.opacity *= this._effectDuration / (this._effectDuration + 1);
};

// Sprite_Enemy
Sprite_BattlerTs.prototype.updateBossCollapse = function() {
    this._shake = this._effectDuration % 2 * 4 - 2;
    this.blendMode = 1;
    this.opacity *= this._effectDuration / (this._effectDuration + 1);
    this.setBlendColor([255, 255, 255, 255 - this.opacity]);
    if (this._effectDuration % 20 === 19) {
        SoundManager.playBossCollapse2();
    }
};

// Sprite_Enemy
Sprite_BattlerTs.prototype.updateInstantCollapse = function() {
    this.opacity = 0;
};

//-----------------------------------------------------------------------------
// Sprite_HpGauge
//
// The sprite for displaying the hp gauge.

function Sprite_HpGauge() {
    this.initialize.apply(this, arguments);
};

Sprite_HpGauge.prototype = Object.create(Sprite.prototype);
Sprite_HpGauge.prototype.constructor = Sprite_HpGauge;

Sprite_HpGauge.prototype.initialize = function(battler) {
    Sprite.prototype.initialize.call(this);
    this.bitmap = new Bitmap(40, 4);
    this.windowskin = ImageManager.loadSystem('Window');
    this.anchor.x = 0.5;
    this.anchor.y = 0;
    this._battler = battler;
};

Sprite_HpGauge.prototype.gaugeBackColor = function() {
    return this.textColor(19);
};

Sprite_HpGauge.prototype.hpGaugeColor1 = function() {
    return this.textColor(20);
};

Sprite_HpGauge.prototype.hpGaugeColor2 = function() {
    return this.textColor(21);
};

Sprite_HpGauge.prototype.textColor = function(n) {
    var px = 96 + (n % 8) * 12 + 6;
    var py = 144 + Math.floor (n / 8) * 12 + 6;
    return this.windowskin.getPixel(px, py);
};

Sprite_HpGauge.prototype.update = function(battler) {
    Sprite.prototype.update.call(this);
    this.bitmap.clear();
    if (this._battler.isAlive()) {
        this.drawBattlerHP();
    }
};

Sprite_HpGauge.prototype.drawBattlerHP = function() {
    var width = 40;
    var color1 = this.hpGaugeColor1();
    var color2 = this.hpGaugeColor2();
    this.drawGauge(0, 0, width, this._battler.hpRate(), color1, color2)
};

Sprite_HpGauge.prototype.drawGauge = function(x, y, width, rate, color1, color2) {
    var fillW = Math.floor(width * rate);
    this.bitmap.fillRect(x, y, width, 4, this.gaugeBackColor());
    this.bitmap.gradientFillRect(x, y, fillW, 4, color1, color2);
};

//-----------------------------------------------------------------------------
// Sprite_Start
//
// The sprite for displaying the start message.

function Sprite_Start() {
    this.initialize.apply(this, arguments);
};

Sprite_Start.prototype = Object.create(Sprite.prototype);
Sprite_Start.prototype.constructor = Sprite_Start;

Sprite_Start.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this.bitmap = new Bitmap(Graphics.width, Graphics.height);
    this._delay = 0;
    this._maxDuration = TacticsSystem.durationStartSprite;
    this.z = 8;
    this.opacity = 0;
};

Sprite_Start.prototype.update = function(battler) {
    Sprite.prototype.update.call(this);
    this.updateMain();
    this.updatePosition();
    this.updateOpacity();
};

Sprite_Start.prototype.isPlaying = function() {
    return $gameScreen.startDuration() > 0;
};

Sprite_Start.prototype.updateMain = function() {
    if (this.isPlaying()) {
        this.drawStart();
        this.updatePosition();
    } else {
        this.hide();
    }
};

Sprite_Start.prototype.drawStart = function() {
    var x = 20;
    var y = Graphics.height / 2;
    var maxWidth = Graphics.width - x * 2;
    this.bitmap.clear();
    this.bitmap.outlineColor = 'black';
    this.bitmap.outlineWidth = 8;
    this.bitmap.fontSize = 86;
    var startTerm = TacticsSystem.battleStartTerm;
    this.bitmap.drawText(startTerm, x, y, maxWidth, 48, 'center');
    this.bitmap.outlineWidth = 4;
    this.bitmap.fontSize = 28;
    this.opacity = 255;
    this.show();
};

Sprite_Start.prototype.updatePosition = function() {
    this.x = Graphics.width / 2 - this.bitmap.width / 2;
    this.y = Graphics.height / 2 - this.bitmap.height / 2 - 120;
};

Sprite_Start.prototype.updateOpacity = function() {
    var d = $gameScreen.startDuration();
    if (d < 30) {
        this.opacity = 255 * d / 30;
    }
    if (d > this._maxDuration - 60) {
        this.opacity = 255 * (this._maxDuration - d) / 60;
    }
};

//-----------------------------------------------------------------------------
// Window_TacticsCommand
//
// The window for selecting an actor's action on the tactics screen.

function Window_TacticsCommand() {
    this.initialize.apply(this, arguments);
}

Window_TacticsCommand.prototype = Object.create(Window_ActorCommand.prototype);
Window_TacticsCommand.prototype.constructor = Window_TacticsCommand;

Window_TacticsCommand.prototype.initialize = function(rect) {
    const _rect = rect || this.windowTacticsCommandRect();
    Window_Command.prototype.initialize.call(this, _rect);
    this.openness = 0;
    this.deactivate();
    this._actor = null;
};

Window_TacticsCommand.prototype.windowTacticsCommandRect = function(){
    var y = Graphics.boxHeight - 160;
    var width = 240;
    var height = 160;
    return new Rectangle(0, y, width, height);
}

Window_TacticsCommand.prototype.makeCommandList = function() {
    if (this._actor) {
        this.addActionCommand();
        this.addAttackCommand();
        this.addSkillCommands();
        if (this._actor.canGuard()) { 
            this.addGuardCommand();
        } else {
            this.addWaitCommand();
        }
        this.addItemCommand();
    }
};

Window_TacticsCommand.prototype.addActionCommand = function() {
    this._actor.checkEventTriggerThere();
    this._actor.actionsButton().forEach(function(eventId) {
        var event = $gameMap.event(eventId);
        this.addCommand(event.name(), 'event');
    }, this);
};

Window_TacticsCommand.prototype.addWaitCommand = function() {
    this.addCommand(TacticsSystem.wait, 'wait', true);
};

Window_TacticsCommand.prototype.setup = function(actor) {
    this._actor = actor;
    this.refresh();
    this.selectLast();
    this.activate();
    this.open();
};

//-----------------------------------------------------------------------------
// Window_TacticsStatus
//
// The window for displaying the unit status on the tactics screen.

function Window_TacticsStatus() {
    this.initialize.apply(this, arguments);
}

Window_TacticsStatus.prototype = Object.create(Window_StatusBase.prototype);
Window_TacticsStatus.prototype.constructor = Window_TacticsStatus;

Window_TacticsStatus.prototype.initialize = function(rect) {
    const _rect = rect || this.windowTacticsStatusRect();
    Window_StatusBase.prototype.initialize.call(this, _rect);
    this.openness = 0;
    this._battler = null;
};

Window_TacticsStatus.prototype.windowTacticsStatusRect = function () {
    var y = Graphics.boxHeight - (this.windowHeight());
    var width = this.windowWidth();
    var height = this.windowHeight();
    return new Rectangle(0, y, width, height);
}

Window_TacticsStatus.prototype.windowWidth = function() {
    return 816/2 - 32;
};

Window_TacticsStatus.prototype.windowHeight = function() {
    return this.fittingHeight(this.numVisibleRows());
};

Window_TacticsStatus.prototype.numVisibleRows = function() {
    return 3;
};

Window_TacticsStatus.prototype.open = function(battler) {
    if (battler) {
        this._battler = battler;
    }
    this.refresh();
    Window_Base.prototype.open.call(this);
};

Window_TacticsStatus.prototype.refresh = function() {
    this.contents.clear();
    if (this._battler) {
        this.drawBattlerStatus();
    }
};

Window_TacticsStatus.prototype.drawBattlerStatus = function() {
    if (this._battler.isActor()) {
        this.drawActorFrame();
        this.drawActorSimpleStatus(this._battler, 0, 0, 376);
    } else {
        this.drawEnemyFrame();
        this.drawEnemySimpleStatus(this._battler, 0, 0, 376);
    }
};

Window_TacticsStatus.prototype.drawActorFrame = function() {
     if (TacticsSystem.showFaceUnit) {
        this.drawActorFace(this._battler, 0, 0, Window_Base.prototype._faceWidth, Window_Base.prototype._faceHeight);
    } else {
        this.drawActorCharacter(this._battler, 48+24, 48*2);
    }
};

Window_TacticsStatus.prototype.drawEnemyFrame = function() {
    if (TacticsSystem.showFaceUnit) {
        this.drawEnemyImage(this._battler, 0, 0);
    } else {
        var event = this._battler.event();
        this.drawCharacter(event.characterName(), event.characterIndex(), 48+24, 48*2);
    }
};

Window_TacticsStatus.prototype.drawEnemySimpleStatus = function(enemy, x, y, width) {
    var lineHeight = this.lineHeight();
    var x2 = x + 180;
    this.drawActorName(enemy, x2, y);
    this.placeBasicGaugesEnemy(enemy, x2, y + lineHeight);
};

Window_TacticsStatus.prototype.placeBasicGaugesEnemy = function(enemy, x, y) {
    this.placeGaugeEnemy(enemy, "hp", x, y);
    this.placeGaugeEnemy(enemy, "mp", x, y + this.gaugeLineHeight());
};

Window_StatusBase.prototype.placeGaugeEnemy = function(enemy, type, x, y) {
    const key = "enemy%1-gauge-%2".format(enemy.enemyId(), type);
    const sprite = this.createInnerSprite(key, Sprite_Gauge);
    sprite.setup(enemy, type);
    sprite.move(x, y);
    sprite.show();
};

//-----------------------------------------------------------------------------
// Window_TacticsSkill
//
// The window for selecting a skill to use on the tactics screen.

function Window_TacticsSkill() {
    this.initialize.apply(this, arguments);
}

Window_TacticsSkill.prototype = Object.create(Window_BattleSkill.prototype);
Window_TacticsSkill.prototype.constructor = Window_TacticsSkill;

Window_TacticsSkill.prototype.processCursorMove = function() {
    var lastIndex = this.index();
    Window_BattleSkill.prototype.processCursorMove.call(this);
    if (this.index() !== lastIndex) {
        this.refreshRedCells();
    }
};

Window_TacticsSkill.prototype.show = function() {
    Window_BattleSkill.prototype.show.call(this);
    if (this.item()) {
        this.refreshRedCells();
    }
};

Window_TacticsSkill.prototype.onTouch = function(triggered) {
    var lastIndex = this.index();
    Window_BattleSkill.prototype.onTouch.call(this, triggered);
    if (this.index() !== lastIndex) {
        this.refreshRedCells();
    }
};

Window_TacticsSkill.prototype.refreshRedCells = function() {
    var action = BattleManager.inputtingAction();
    action.setSkill(this.item().id);
    BattleManager.refreshRedCells(action);
};

//-----------------------------------------------------------------------------
// Window_TacticsItem
//
// The window for selecting a item to use on the tactics screen.

function Window_TacticsItem() {
    this.initialize.apply(this, arguments);
}

Window_TacticsItem.prototype = Object.create(Window_BattleItem.prototype);
Window_TacticsItem.prototype.constructor = Window_TacticsItem;

Window_TacticsItem.prototype.processCursorMove = function() {
    var lastIndex = this.index();
    Window_BattleItem.prototype.processCursorMove.call(this);
    if (this.index() !== lastIndex) {
        var action = BattleManager.inputtingAction();
        action.setItem(this.item().id);
        BattleManager.refreshRedCells(action);
    }
};

Window_TacticsItem.prototype.show = function() {
    Window_BattleItem.prototype.show.call(this);
    if (this.item()) {
        var action = BattleManager.inputtingAction();
        action.setItem(this.item().id);
        BattleManager.refreshRedCells(action);
    }
};

//-----------------------------------------------------------------------------
// Window_TacticsInfo
//
// The window for displaying the combat information on the battle screen.

function Window_TacticsInfo() {
    this.initialize.apply(this, arguments);
}

Window_TacticsInfo.prototype = Object.create(Window_Status.prototype);
Window_TacticsInfo.prototype.constructor = Window_TacticsInfo;

Window_TacticsInfo.prototype.initialize = function(rect) {
    const _rect = rect || this.windowTacticsInfoRect() ;
    Window_Status.prototype.initialize.call(this, _rect);
    this.openness = 0;
    this.width = this.windowWidth();
    this.height = this.windowHeight();
};

Window_TacticsInfo.prototype.windowTacticsInfoRect = function (){
    var width = Graphics.boxWidth;
    var height = Graphics.boxHeight;
    return new Rectangle(0, 0, width, height);
}

Window_TacticsInfo.prototype.windowWidth = function() {
    return 816 / 2 - 100;
};

Window_TacticsInfo.prototype.windowHeight = function() {
    return this.fittingHeight(this.numVisibleRows());
};

Window_TacticsInfo.prototype.numVisibleRows = function() {
    return 3;
};

Window_TacticsInfo.prototype.open = function(battler) {
    var actor = JsonEx.makeDeepCopy(battler);
    this.setActor(actor);
    this.refresh()
    Window_Base.prototype.open.call(this);
};

Window_TacticsInfo.prototype.refresh = function() {
    this.contents.clear();
    if (this._actor) {
        this.drawBlock1(0); // this.lineHeight() * 0
    }
};

Window_TacticsInfo.prototype.drawBlock1 = function(y) {
    var lineHeight = this.lineHeight();
    this.drawDamage(this._actor, 16, y + lineHeight * 0);
    this.drawHit(this._actor, 16, y + lineHeight * 1);
    this.drawCri(this._actor, 16, y + lineHeight * 2);
};

Window_TacticsInfo.prototype.drawDamage = function(actor, x, y) {
    var width = 168;
    var action = BattleManager.inputtingAction();
    this.drawDamageType(action, x, y, width);
    var minHit = Math.abs(action.testDamageMinMaxValue(actor, false));
    var maxHit = Math.abs(action.testDamageMinMaxValue(actor, true));
    if(minHit == maxHit) {
        if(maxHit != 0) {this.drawText(maxHit, x + 120, y, 120, 'right');}
    } else {
        this.drawText(minHit + '-' + maxHit, x + 120, y, 120, 'right');
    }
};

Window_TacticsInfo.prototype.drawDamageType = function(action, x, y) {
    this.changeTextColor(this.systemColor());
    if (action.isDamage()) {
        this.drawText(TacticsSystem.damageTerm, x, y, 160);
    } else if (action.isRecover()) {
        this.drawText(TacticsSystem.recoverTerm, x, y, 160);
    } else if (action.isDrain()) {
        this.drawText(TacticsSystem.drainTerm, x, y, 160);
    } else if (action.isTeleport()) {
        this.drawText(TacticsSystem.teleportTerm, x, y, 160);
    } else {
        var name = action.item().meta['Name'];
        if(!name) {name = TacticsSystem.otherActionTerm};
        this.drawText(name, x, y, 160);
    }
    this.resetTextColor();
};

Window_TacticsInfo.prototype.drawHit = function(actor, x, y) {
    this.changeTextColor(this.systemColor());
    this.drawText(TacticsSystem.hitRateTerm, x, y, 160);
    this.resetTextColor();
    var action = BattleManager.inputtingAction();
    var hit = action.itemHit(actor) * 100 + '%';
    this.drawText(hit, x + 180, y, 60, 'right');
};

Window_TacticsInfo.prototype.drawCri = function(actor, x, y) {
    this.changeTextColor(this.systemColor());
    this.drawText(TacticsSystem.criticalRateTerm, x, y, 160);
    this.resetTextColor();
    var action = BattleManager.inputtingAction();
    var crit = Math.round(action.itemCri(actor) * 100) + '%';
    this.drawText(crit, x + 180, y, 60, 'right');
};

//-----------------------------------------------------------------------------
// Window_TacticsMap
//
// The window for displaying essential commands for progressing in tactics screen.

function Window_TacticsMap() {
    this.initialize.apply(this, arguments);
}

Window_TacticsMap.prototype = Object.create(Window_MenuCommand.prototype);
Window_TacticsMap.prototype.constructor = Window_TacticsMap;

Window_TacticsMap.prototype.initialize = function(x, y) {
    const rect = this.windowTacticsMapRect();
    Window_MenuCommand.prototype.initialize.call(this, rect);
    this.hide();
    this.deactivate();
};

Window_TacticsMap.prototype.windowTacticsMapRect = function () {
    return new Rectangle(0,0, 240, this.fittingHeight(this.numVisibleRows()));
}

Window_TacticsMap.prototype.numVisibleRows = function() {
    return 5;
};

Window_TacticsMap._lastCommandSymbol = null;

Window_TacticsMap.initCommandPosition = function() {
    this._lastCommandSymbol = null;
};

Window_TacticsMap.prototype.addMainCommands = function() {
    var enabled = this.areMainCommandsEnabled();
    this.addCommand(TacticsSystem.endTurnTerm, 'endTurn');
    if (this.needsCommand('equip')) {
        this.addCommand(TextManager.equip, 'equip', enabled);
    }
    if (this.needsCommand('status')) {
        this.addCommand(TextManager.status, 'status', enabled);
    }
};

Window_TacticsMap.prototype.addSaveCommand = function() {
};

Window_TacticsMap.prototype.addFormationCommand = function() {
};

Window_TacticsMap.prototype.selectLast = function() {
    this.selectSymbol(Window_TacticsMap._lastCommandSymbol);
};

//-----------------------------------------------------------------------------
// Window_Base
//
// The superclass of all windows within the game.

Window_Base.prototype._faceWidth  = 144;
Window_Base.prototype._faceHeight = 144;

Window_Base.prototype.drawEnemyImage = function(battler, x, y) {
    width = Window_Base.prototype._faceWidth;
    height = Window_Base.prototype._faceHeight;
    var bitmap = ImageManager.loadEnemy(battler.battlerName());
    var pw = bitmap.width;
    var ph = bitmap.height;
    var sw = Math.min(width, pw);
    var sh = Math.min(height, ph);
    var dx = Math.floor(x + Math.max(width - pw, 0) / 2);
    var dy = Math.floor(y + Math.max(height - ph, 0) / 2);
    var q = 150 / Math.max(bitmap.width, bitmap.height)
    this.contents.blt(bitmap, 0, 0, pw, ph, dx, dy, bitmap.width * q, bitmap.height * q);
};
