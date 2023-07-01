using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class RockHeadIdle : StateMachineBehaviour
{
    private bool hasBlinked = false;
    private Rigidbody2D rb;
    private float cooldownBetweenBlink; // seconds

    float timePassed = 0f;

    override public void OnStateEnter(Animator animator, AnimatorStateInfo stateInfo, int layerIndex)
    {
        cooldownBetweenBlink = Random.Range(2, 6);
        rb = animator.GetComponent<Rigidbody2D>();
    }

    // OnStateUpdate is called on each Update frame between OnStateEnter and OnStateExit callbacks
    override public void OnStateUpdate(Animator animator, AnimatorStateInfo stateInfo, int layerIndex)
    {
        timePassed += Time.deltaTime;
        if (
            Random.value <= 0.25f && 
            !Mathf.Approximately(rb.velocity.magnitude, 0) &&
            timePassed > cooldownBetweenBlink && 
            animator.GetCurrentAnimatorStateInfo(0).IsName("RockHeadIdle")
        )
        {
            cooldownBetweenBlink = Random.Range(3, 7);
            timePassed = 0;
            animator.SetBool("Blinking", true);
        }
    }
}
