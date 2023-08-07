using System.Collections.Generic;
using System;
using System.Linq;

using UnityEngine;

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
    [SerializeField]
    private bool showConsole;
    private bool showHelp;

    private string input = "";

    public static DebugCommand HELP;
    public static DebugCommand HELP_2;
    public static DebugCommand<string> TELEPORT;
    public static DebugCommand<float?> HEAL;
    public static DebugCommand<float?> HURT;
    public static DebugCommand QUIT;

    public FloatVariable currentHealth;

    public List<object> commandList;

    private Vector2 scroll;

    [SerializeField]
    private GUIStyle btnStyle;

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
            showConsole = false;
            showHelp = false;
        });

        TELEPORT = new DebugCommand<string>("teleport", "Teleports player into a specific place", "teleport <string as Vector2>", (vector) =>
        {
            Debug.Log(GetVector2("2, 3"));
        });

        HEAL = new DebugCommand<float?>("heal", "Heal the player with an amount of points (0 by default)", "heal <int>", (val) =>
        {
            currentHealth.CurrentValue += val ?? 0;
        });

        HURT = new DebugCommand<float?>("hurt", "Hurt the player with an amount of points (0 by default)", "hurt <int>", (val) =>
        {
            print(val);
            currentHealth.CurrentValue -= val ?? 0;
        });

        commandList = new List<object> {
            HELP,
            HELP_2,
            TELEPORT,
            HEAL,
            HURT,
            QUIT
        };
        commandList = commandList
            .Select(x => x as DebugCommandBase)
            .OrderBy(x => x.commandId)
            .Select(x => x as object)
            .ToList();
    }

    public Vector2 GetVector2(string rString)
    {
        string[] listParams = rString.Split(',');
        float x = Convert.ToSingle(listParams[0]);
        float y = Convert.ToSingle(listParams[1]);
        Vector2 rValue = new(x, y);

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
                // showConsole = !showConsole;
                showConsole = true;
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
        // btnStyle = new GUIStyle(GUI.skin.button);
        // mainContainerStyle = new GUIStyle(GUI.skin.label);

        float y = 0f;
        float inputContainerHeight = 50;
        // GUI.Label(new Rect(10, 10, 100, 20), "Hello World!");
        GUI.Box(new Rect(0, y, Screen.width, inputContainerHeight), "Hello World!", mainContainerStyle);

        GUI.SetNextControlName("debug");
        input = GUI.TextField(new Rect(10f, y + 20f, Screen.width - 20f, 20f), input);

        // Log area
        y = 30f;
        if (displayType != DisplayType.Hide)
        {
            GUI.Box(new Rect(0, inputContainerHeight, Screen.width, 150), "");
        }

        if (GUI.GetNameOfFocusedControl() == null && displayType != DisplayType.Hide)
        {
            // GUI.FocusControl("debug");
        }

        if (input.Length > 0 && displayType == DisplayType.Autocomplete)
        {
            Autocomplete(inputContainerHeight, input);
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
            else if (e.keyCode == KeyCode.Tab)
            {
                displayType = DisplayType.Autocomplete;
            }
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
            if (input.Contains(commandBase.commandId))
            {
                if (commandList[i] as DebugCommand != null)
                {
                    (commandList[i] as DebugCommand).Invoke();
                }
                else if (commandList[i] as DebugCommand<string> != null)
                {
                    (commandList[i] as DebugCommand<string>).Invoke(listCommandProperties[1]);
                }
                else if (commandList[i] as DebugCommand<float?> != null)
                {
                    if (float.TryParse(listCommandProperties[1], out float val))
                    {
                        (commandList[i] as DebugCommand<float?>).Invoke(val);
                    }
                    else
                    {
                        // Debug.LogError($"'{command.Id}' requires a float parameter!");
                        return;
                    }
                }
            }
        }
    }

    private void ShowHelp(float y)
    {
        displayType = DisplayType.Show;
        Rect helpContainerViewport = new Rect(0, 0, Screen.width, 20 * commandList.Count);
        scroll = GUI.BeginScrollView(new Rect(0, y + 5, Screen.width, 150), scroll, helpContainerViewport);

        for (int i = 0; i < commandList.Count; i++)
        {
            DebugCommandBase command = commandList[i] as DebugCommandBase;
            string commandLabel = $"{command.commandFormat} - {command.commandDescription}";

            Rect commandLabelRect = new(5, 20 * i, helpContainerViewport.width - 20f, 20);

            if (GUI.Button(commandLabelRect, commandLabel))
            {
                input = command.commandFormat;
            }
        }

        GUI.EndScrollView();
        // y += 100f;
    }


    private void Autocomplete(float y, string newInput)
    {
        IEnumerable<object> autocompleteCommands = commandList.Select(x => x as DebugCommandBase)
            .Where(k => k.commandId.StartsWith(newInput.ToLower()));

        Rect helpContainerViewport = new(0, y, Screen.width, 20 * autocompleteCommands.ToArray().Length);
        scroll = GUI.BeginScrollView(new Rect(0, y + 5, Screen.width, 90), scroll, helpContainerViewport);

        if (autocompleteCommands.Count() == 0)
        {
            displayType = DisplayType.Hide;
        }


        foreach (DebugCommandBase command in autocompleteCommands.Cast<DebugCommandBase>())
        {
            string commandLabel = $"{command.commandFormat} - {command.commandDescription}";
            Rect commandLabelRect = new(10f, y, Screen.width - 20f, 20);

            if (GUI.Button(commandLabelRect, commandLabel))
            {
                input = command.commandFormat;
            }
            // GUI.Label(
            //     new Rect(10f, y, Screen.width, 20),
            //     commandLabel,
            //     mainContainerStyle
            // );
            y += 20;
        }

        GUI.EndScrollView();
    }
}
