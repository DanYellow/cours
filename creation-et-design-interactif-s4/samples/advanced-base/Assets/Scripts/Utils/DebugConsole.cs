using System.Collections.Generic;
using System;
using System.Linq;
using System.Globalization;
using UnityEngine.SceneManagement;

using UnityEngine;
using System.Text.RegularExpressions;

enum DisplayType
{
    Hide,
    Show,
    Autocomplete
}

// https://www.youtube.com/watch?v=VzOEM-4A2OM
// https://github.com/MinaPecheux/UnityTutorials-RTS/blob/master/Assets/Scripts/DebugConsole/DebugConsole.cs
public class DebugConsole : MonoBehaviour
{
    private bool showConsole;
    private bool showHelp;

    private string input = "";

    public static DebugCommand HELP;
    public static DebugCommand HELP_2;
    public static DebugCommand<string> TELEPORT;
    public static DebugCommand<string> LOAD;
    public static DebugCommand<float?> HEAL;
    public static DebugCommand<float?> HURT;
    public static DebugCommand QUIT;
    public static DebugCommand DIE;
    public static DebugCommand RELOAD;

    public HealthVariable playerHealth;

    public List<object> commandList;

    private Vector2 scroll;

    public VectorEventChannel onDebugTeleportEvent;
    public StringEventChannelSO onLevelEnded;
    public VoidEventChannelSO onDebugPlayerDeathEvent;

    private readonly CultureInfo cultureInfo = new CultureInfo("en-US");

    private bool finishAutoCompletion = false;

    [SerializeField]
    private GUIStyle mainContainerStyle;

    private DisplayType displayType = DisplayType.Hide;

    private void Awake()
    {
        HELP = new DebugCommand("help", "Show all commands", "help", () =>
        {
            showHelp = true;
        });

        HELP_2 = new DebugCommand("?", "Show all commands", "?", () =>
        {
            showHelp = true;
        });

        QUIT = new DebugCommand("quit", "Close the help command", "quit", () =>
        {
            Hide();
        });

        DIE = new DebugCommand("die", "kill player", "die", () =>
        {
            onDebugPlayerDeathEvent.Raise();
        });

        TELEPORT = new DebugCommand<string>("teleport", "Teleports player into a specific place", "teleport <string as Vector2>", (val) =>
        {
            onDebugTeleportEvent.Raise(StringToVector3(val));
        });

        HEAL = new DebugCommand<float?>("heal", "Heal the player with an amount of points (0 by default)", "heal <int>", (val) =>
        {
            playerHealth.currentValue += val ?? 0;
        });

        HURT = new DebugCommand<float?>("hurt", "Hurt the player with an amount of points (0 by default)", "hurt <int>", (val) =>
        {
            playerHealth.currentValue -= val ?? 0;
        });

        LOAD = new DebugCommand<string>("load_scene", "Load specific scene by name", "load_scene <string>", (val) =>
        {
            onLevelEnded.Raise(val);
        });

        RELOAD = new DebugCommand("reload_scene", "Reload current scene", "reload_scene", () =>
        {
            onLevelEnded.Raise(SceneManager.GetActiveScene().name);
        });

        commandList = new List<object> {
            HELP,
            HELP_2,
            TELEPORT,
            HEAL,
            HURT,
            QUIT,
            LOAD,
            DIE,
            RELOAD,
        };
        commandList = commandList
            .Select(x => x as DebugCommandBase)
            .OrderBy(x => x.commandId)
            .Select(x => x as object)
            .ToList();
    }

    public Vector3 StringToVector3(string rString)
    {
        string[] listParams = rString.Split(',');
        float x = Convert.ToSingle(listParams[0], cultureInfo);
        float y = Convert.ToSingle(listParams[1], cultureInfo);
        Vector3 rValue = new(x, y, 0);

        return rValue;
    }

    // Update is called once per frame
    void Update()
    {
#if UNITY_EDITOR
        if (
            Input.GetKey(KeyCode.LeftControl) ||
            Input.GetKey(KeyCode.LeftApple)
        )
        {
            if (Input.GetKeyDown(KeyCode.B))
            {
                showConsole = !showConsole;
            }
        }
#endif
    }

    private void OnGUI()
    {
        if (!showConsole)
        {
            return;
        }

        mainContainerStyle = new GUIStyle(GUI.skin.box);
        float y = 0f;
        float inputContainerHeight = 50;

        GUI.Box(new Rect(0, y, Screen.width, inputContainerHeight), "DEBUG CONSOLE - Use help or ? command to list all available commands", mainContainerStyle);

        input = GUI.TextField(new Rect(10f, y + 20f, Screen.width - 20f, 20f), input);

        // Log area
        y = 30f;
        if (displayType != DisplayType.Hide)
        {
            GUI.Box(new Rect(0, inputContainerHeight, Screen.width, 165), "");
        }

        if (input.Length > 0 && displayType == DisplayType.Autocomplete)
        {
            Autocomplete(inputContainerHeight, input, finishAutoCompletion);
        }
        else if (showHelp)
        {
            ShowHelp(inputContainerHeight);
        }
        else if (input.Length == 0)
        {
            displayType = DisplayType.Hide;
        }

        Event e = Event.current;
        if (e.isKey)
        {
            if (
                (e.keyCode == KeyCode.Return || e.keyCode == KeyCode.KeypadEnter) &&
                input.Length > 0
            )
            {
                HandleInput();
                input = "";
            }
            else if (e.keyCode == KeyCode.Escape)
            {
                Hide();
            }
            else
            {
                finishAutoCompletion = false;
            }
        }

        // https://docs.unity3d.com/560/Documentation/Manual/ConventionalGameInput.html
        if (Event.current.Equals(Event.KeyboardEvent("tab")))
        {
            if (displayType == DisplayType.Autocomplete)
            {
                finishAutoCompletion = true;
            }
            displayType = DisplayType.Autocomplete;
        }
    }

    private void Hide()
    {
        GUI.FocusControl(null);
        showConsole = false;
        displayType = DisplayType.Hide;
    }

    private void HandleInput()
    {
        string[] listCommandProperties = input.Split(" ");

        for (int i = 0; i < commandList.Count; i++)
        {
            DebugCommandBase commandBase = commandList[i] as DebugCommandBase;
            string pattern = @"" + Regex.Escape(commandBase.commandId) + @"";
            if (Regex.IsMatch(input, pattern))
            {
                if (commandList[i] as DebugCommand != null)
                {
                    (commandList[i] as DebugCommand).Invoke();
                }
                else if (commandList[i] as DebugCommand<string> != null)
                {
                    // https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/proposals/csharp-8.0/ranges#systemrange
                    (commandList[i] as DebugCommand<string>).Invoke(string.Join("", listCommandProperties[1..]));
                }
                else if (commandList[i] as DebugCommand<float?> != null)
                {
                    if (float.TryParse(listCommandProperties[1], out float val))
                    {
                        (commandList[i] as DebugCommand<float?>).Invoke(val);
                    }
                    else
                    {
                        Debug.LogError($"requires a float parameter!");
                        return;
                    }
                }
            }
            else
            {
                Debug.Log("Unknown command");
            }
        }
    }

    private void ShowHelp(float y)
    {
        displayType = DisplayType.Show;
        Rect helpContainerViewport = new(0, 0, Screen.width, 20 * commandList.Count);
        scroll = GUI.BeginScrollView(new Rect(0, y + 5, Screen.width, 150), scroll, helpContainerViewport, GUIStyle.none, GUI.skin.verticalScrollbar);

        ShowResults(0, commandList.Select(x => x as DebugCommandBase).ToList());

        GUI.EndScrollView();
    }


    private void Autocomplete(float y, string newInput, bool fillField)
    {
        List<DebugCommandBase> autocompleteCommands = commandList.Select(x => x as DebugCommandBase)
            .Where(k => k.commandId.StartsWith(newInput.ToLower())).ToList();

        Rect helpContainerViewport = new(0, y, Screen.width, 20 * autocompleteCommands.Count);
        scroll = GUI.BeginScrollView(new Rect(0, y + 5, Screen.width, 150), scroll, helpContainerViewport, GUIStyle.none, GUI.skin.verticalScrollbar);

        // scroll = GUILayout.BeginScrollView(scrollPos, false, false, GUIStyle.none, GUI.skin.verticalScrollbar);
        if (autocompleteCommands.Count == 0)
        {
            displayType = DisplayType.Hide;
        }

        if (fillField && autocompleteCommands.Count == 1)
        {
            DebugCommandBase command = autocompleteCommands[0];
            input = command.commandFormat;
        }

        ShowResults(y, autocompleteCommands);

        GUI.EndScrollView();
    }

    private void ShowResults(float y, List<DebugCommandBase> list)
    {
        const float itemHeight = 20;
        foreach (var item in list.Select((value, idx) => new { idx, value }))
        {
            DebugCommandBase command = item.value;
            int index = item.idx;

            string commandLabel = $"{command.commandFormat} - {command.commandDescription}";
            Rect commandLabelRect = new(5, y + (itemHeight * index), Screen.width - 25f, itemHeight);

            if (GUI.Button(commandLabelRect, commandLabel))
            {
                input = command.commandFormat;
            }
        }
    }
}
