using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class RockHeadIdle : StateMachineBehaviour
{
    private bool hasBlinked = false;
    private Rigidbody2D rb;
    public float cooldown = 1f; //seconds
private float lastAttackedAt = -9999f;

    override public void OnStateEnter(Animator animator, AnimatorStateInfo stateInfo, int layerIndex)
    {
        rb = animator.GetComponent<Rigidbody2D>();
    }

    // OnStateUpdate is called on each Update frame between OnStateEnter and OnStateExit callbacks
    override public void OnStateUpdate(Animator animator, AnimatorStateInfo stateInfo, int layerIndex)
    {
        if(Random.value <= 0.25f && (!Mathf.Approximately(rb.velocity.x, 0) || !Mathf.Approximately(rb.velocity.y, 0)) && Time.time > lastAttackedAt + cooldown) {
            // animator.SetTrigger("Blinking");
            lastAttackedAt = Time.time;
            animator.SetBool("Blinking", true);
        }
        // if (!Mathf.Approximately(rb.velocity.x, 0))
        // // if (Random.value <= 0.25f && !hasBlinked && (!Mathf.Approximately(rb.velocity.x, 0) || !Mathf.Approximately(rb.velocity.y, 0)))
        // {
        //     Debug.Log(rb.velocity);
        //     animator.SetTrigger("Blinking");
        //     hasBlinked = true;
        // }
    }

    // OnStateExit is called when a transition ends and the state machine finishes evaluating this state
    override public void OnStateExit(Animator animator, AnimatorStateInfo stateInfo, int layerIndex)
    {
        Debug.Log("Hello");
        hasBlinked = false;
    }
}
