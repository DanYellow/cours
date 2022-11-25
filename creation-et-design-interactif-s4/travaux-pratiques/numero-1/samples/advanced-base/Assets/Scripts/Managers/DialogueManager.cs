using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class DialogueManager : MonoBehaviour {

	public TextMeshProUGUI nameText;
	public TextMeshProUGUI dialogueText;

	public Animator animator;
	internal bool isDialogueEnded = true;
	private Queue<string> listSentences;

    private Dialogue currentDialogue;

	void Start () {
		listSentences = new Queue<string>();
		dialogueText.text = "";
		
		// nameText.text = "";
	}

	public void OpenDialogueBox(Dialogue dialogue) {
		currentDialogue = dialogue;
		 isDialogueEnded = false;
		// nameText.text = dialogue.name;
		animator.SetBool("IsOpen", true);
		StartCoroutine(StartDialogue());
	}

	IEnumerator StartDialogue ()
	{
		yield return new WaitForSeconds(animator.GetCurrentAnimatorStateInfo(0).length);
		// nameText.text = dialogue.name;

		listSentences.Clear();
		LoadDialogue(currentDialogue);
		DisplayNextSentence();
	}

    void LoadDialogue(Dialogue dialogue) {
        foreach (string sentence in dialogue.sentences)
		{
			listSentences.Enqueue(sentence);
		}
    }

	public void DisplayNextSentence ()
	{
		if (listSentences.Count == 0)
		{
			EndDialogue();
			return;
		}

		string sentence = listSentences.Dequeue();
		StopAllCoroutines();
		StartCoroutine(TypeSentence(sentence));
	}

	IEnumerator TypeSentence (string sentence)
	{
		dialogueText.text = "";
		foreach (char letter in sentence.ToCharArray())
		{
			dialogueText.text += letter;
			yield return null;
		}
	}

	public void EndDialogue()
	{
		isDialogueEnded = true;
		animator.SetBool("IsOpen", false);
        StartCoroutine(HideText());
	}

	IEnumerator HideText() {
		yield return new WaitForSeconds(animator.GetCurrentAnimatorStateInfo(0).length);
		dialogueText.text = "";
	}
}