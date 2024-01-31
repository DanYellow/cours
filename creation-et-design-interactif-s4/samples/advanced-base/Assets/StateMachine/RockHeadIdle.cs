using UnityEngine;

public class RockHeadIdle : StateMachineBehaviour
{
    private float cooldownBetweenBlink;

    private float timePassed = 0f;
    private float[] blinkRange = { 0.75f, 2.35f };

    override public void OnStateEnter(Animator animator, AnimatorStateInfo stateInfo, int layerIndex)
    {
        animator.ResetTrigger("Blinking");
        cooldownBetweenBlink = Random.Range(blinkRange[0], blinkRange[1]); // seconds
    }

    // OnStateUpdate is called on each Update frame between OnStateEnter and OnStateExit callbacks
    override public void OnStateUpdate(Animator animator, AnimatorStateInfo stateInfo, int layerIndex)
    {
        timePassed += Time.deltaTime;
        if (
            Random.value <= 0.25f &&
            timePassed > cooldownBetweenBlink
        )
        {
            cooldownBetweenBlink = Random.Range(blinkRange[0], blinkRange[1]);
            timePassed = 0;
            animator.SetTrigger("Blinking");
        }
    }
}
