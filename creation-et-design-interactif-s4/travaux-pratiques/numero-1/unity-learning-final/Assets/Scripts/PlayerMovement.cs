using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    // Start is called before the first frame update

    public Rigidbody2D rb;
    public Animator animator;

    private float horizontalMovement; 
    public float moveSpeed; 

    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        horizontalMovement = Input.GetAxisRaw("Horizontal") * moveSpeed;
        animator.SetFloat("HorizontalSpeed", Mathf.Abs(horizontalMovement));
    }

    private void FixedUpdate() {
        rb.velocity = new Vector2(horizontalMovement, rb.velocity.y);
    }
}
