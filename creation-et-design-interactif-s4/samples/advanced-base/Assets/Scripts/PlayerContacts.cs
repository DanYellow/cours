using UnityEngine;

public class PlayerContacts : MonoBehaviour
{
    public BoxCollider2D bc;

    [Header("Crush detection")]
    public LayerMask listContacts;
    public bool hasTopBottomCrushContact = false;
    public bool hasLeftRightCrushContact = false;
    public float crushLengthDetection = 0.25f;

    private void FixedUpdate() {
        hasTopBottomCrushContact = HasTopAndBottomContact().Length == 2;
        hasLeftRightCrushContact = HasLeftAndRightContact().Length == 2;
        if(HasLeftAndRightContact().Length > 0) {

        // print("hasTopBottomCrushContacthasTopBottomCrushContact " + HasLeftAndRightContact().Length);
        }
    }

    public RaycastHit2D[] HasTopAndBottomContact()
    {
        return Physics2D.LinecastAll(
            new Vector2(bc.bounds.center.x, bc.bounds.min.y - crushLengthDetection),
            new Vector2(bc.bounds.center.x, bc.bounds.max.y + crushLengthDetection),
            listContacts
        );
    }

    public RaycastHit2D[] HasLeftAndRightContact()
    {
        return Physics2D.LinecastAll(
            new Vector2(bc.bounds.min.x - crushLengthDetection, bc.bounds.center.y),
            new Vector2(bc.bounds.max.x + crushLengthDetection, bc.bounds.center.y),
            listContacts
        );
    }

    void OnDrawGizmos()
    {
        if(bc != null) {
            Gizmos.color = Color.red;
            Gizmos.DrawLine(
                new Vector2(bc.bounds.min.x - crushLengthDetection, bc.bounds.center.y),
                new Vector2(bc.bounds.max.x + crushLengthDetection, bc.bounds.center.y)
            );
            Gizmos.color = Color.magenta;
            Gizmos.DrawLine(
                new Vector2(bc.bounds.center.x, bc.bounds.min.y - crushLengthDetection),
                new Vector2(bc.bounds.center.x, bc.bounds.max.y + crushLengthDetection)
            );
        }
    }
}
