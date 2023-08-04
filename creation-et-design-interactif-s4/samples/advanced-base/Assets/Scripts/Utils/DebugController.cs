using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;

public class DebugController : MonoBehaviour
{
    private bool showConsole;
    private bool showHelp;

    private string input;

    public static DebugCommand HELP;
    public static DebugCommand<string> TELEPORT;
    public List<object> commandList;

    private void Awake()
    {
        HELP = new DebugCommand("test", "removes", "test", () =>
        {
            showHelp = true;
        });

        TELEPORT = new DebugCommand<string>("teleport", "removes", "teleport", (vector) =>
        {
            Debug.Log(GetVector2("2, 3"));
        });

        commandList = new List<object> {
            HELP,
            TELEPORT
        };
    }

    public Vector2 GetVector2(string rString)
    {
        string[] temp = rString.Split(',');
        float x = System.Convert.ToSingle(temp[0]);
        float y = System.Convert.ToSingle(temp[1]);
        Vector2 rValue = new Vector2(x, y);

        return rValue;
    }

    // Update is called once per frame
    void Update()
    {
        #if UNITY_EDITOR
        if (Input.GetKeyDown(KeyCode.I))
        {
            showConsole = !showConsole;
        }
        #endif
    }

    private void OnGUI()
    {
        
        if (!showConsole) { return; }

        if (Event.current.Equals(Event.KeyboardEvent("[enter]")))
        {
            HandleInput();
            input = "";
        }

        float y = 0f;

        GUI.Box(new Rect(0, y, Screen.width, 30), "");
        GUI.backgroundColor = new Color(0, 0, 0, 0);
        input = GUI.TextField(new Rect(10f, y + 5f, Screen.width - 20f, 20f), input);
    }

    private void HandleInput()
    {
        string[] listCommandProperties = input.Split("");

        for (int i = 0; i < commandList.Count; i++)
        {
            DebugCommandBase commandBase = commandList[i] as DebugCommandBase;
            if (input.Contains(commandBase.commandId))
            {
                if (commandList[i] as DebugCommand != null)
                {
                    (commandList[i] as DebugCommand).Invoke();
                } else if (commandList[i] as DebugCommand<string> != null) {
                    (commandList[i] as DebugCommand<string>).Invoke(listCommandProperties[0]);
                }
            }
        }
    }
}
