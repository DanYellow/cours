using UnityEngine;

public class DialogueTrigger : MonoBehaviour
{
    public Dialogue dialogue;
    private bool isPlayerInRange = false;
    private bool isDialogueStarted = false;

    private DialogueManager dialogueManager;

    private void Start()
    {
        dialogueManager = FindObjectOfType<DialogueManager>();
    }

    private void Update()
    {
        if (isPlayerInRange && Input.GetKeyDown(KeyCode.E))
        {
            TriggerDialogue();
        }
    }

    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            isPlayerInRange = true;
        }
    }

    private void OnTriggerExit2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            isPlayerInRange = false;
            isDialogueStarted = false;
        }
    }

    public void TriggerDialogue()
    {
        if(isDialogueStarted) {
            dialogueManager.DisplayNextSentence();
            if(dialogueManager.isDialogueEnded) {
                isDialogueStarted = false;
            }
        } else {
            Debug.Log("Start Dialogue");
            dialogueManager.OpenDialogueBox(dialogue);
            isDialogueStarted = true;
        }

    }

}
