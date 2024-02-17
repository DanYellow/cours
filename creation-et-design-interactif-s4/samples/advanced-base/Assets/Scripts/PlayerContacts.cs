using UnityEngine;

public class PlayerContacts : MonoBehaviour
{
    public BoxCollider2D bc;

    [Header("Crush detection")]
    public LayerMask listContacts;
    public float crushLengthDetection = 0.25f;
    public float boxCastScaleX = 0.95f;
    public float boxCastScaleY = 0.95f;

    public bool HasTopAndBottomContact()
    {
        bool hasTopContact = Physics2D.BoxCastAll(
            new Vector2(bc.bounds.center.x, bc.bounds.max.y),
            new Vector2(bc.size.x * boxCastScaleX, crushLengthDetection),
            0,
            Vector2.zero,
            Mathf.Infinity,
            listContacts
        ).Length == 1;

        bool hasBottomContact = Physics2D.BoxCastAll(
            new Vector2(bc.bounds.center.x, bc.bounds.min.y),
            new Vector2(bc.size.x * boxCastScaleX, crushLengthDetection),
            0,
            Vector2.zero,
            Mathf.Infinity,
            listContacts
        ).Length == 1;

        return hasTopContact && hasBottomContact;
    }

    public bool HasLeftAndRightContact()
    {
        bool hasLeftContact = Physics2D.BoxCastAll(
            new Vector2(bc.bounds.min.x - (crushLengthDetection / 2), bc.bounds.center.y),
            new Vector2(crushLengthDetection, bc.size.y * boxCastScaleY),
            0,
            Vector2.zero,
            Mathf.Infinity,
            listContacts
        ).Length == 1;

        bool hasRightContact = Physics2D.BoxCastAll(
            new Vector2(bc.bounds.max.x + (crushLengthDetection / 2), bc.bounds.center.y),
            new Vector2(crushLengthDetection, bc.size.y * boxCastScaleY),
            0,
            Vector2.zero,
            Mathf.Infinity,
            listContacts
        ).Length == 1;

        return hasLeftContact && hasRightContact;
    }

    public bool HasLeftOrRightContact()
    {
        bool hasLeftContact = Physics2D.OverlapBoxAll(
            new Vector2(bc.bounds.min.x - (crushLengthDetection / 2), bc.bounds.center.y),
            new Vector2(crushLengthDetection + bc.size.x, bc.size.y * boxCastScaleY),
            0,
            listContacts
        ).Length == 1;

        bool hasRightContact = Physics2D.OverlapBoxAll(
            new Vector2(bc.bounds.max.x, bc.bounds.center.y),
            new Vector2(crushLengthDetection + bc.size.x, bc.size.y * boxCastScaleY),
            0,
            listContacts
        ).Length == 1;

        return hasLeftContact || hasRightContact;
    }

    public bool HasTopOrBottomContact()
    {
        bool hasTopContact = Physics2D.OverlapBoxAll(
            new Vector2(bc.bounds.center.x, bc.bounds.center.y + (crushLengthDetection / 2)),
            new Vector2(bc.size.x * boxCastScaleX, bc.size.y + crushLengthDetection),
            0,
            listContacts
        ).Length == 1;

        bool hasBottomContact = Physics2D.OverlapBoxAll(
            new Vector2(bc.bounds.center.x, bc.bounds.center.y - (crushLengthDetection / 2)),
            new Vector2(bc.size.x * boxCastScaleX, bc.size.y + crushLengthDetection),
            0,
            listContacts
        ).Length == 1;

        return hasTopContact || hasBottomContact;
    }

    public bool HasTopContact() {
        return Physics2D.OverlapBoxAll(
            new Vector2(bc.bounds.center.x, bc.bounds.center.y + (crushLengthDetection / 2) + 0.05f),
            new Vector2(bc.size.x * boxCastScaleX, bc.size.y + crushLengthDetection - 0.05f),
            0,
            listContacts
        ).Length == 1;
    }

    public bool HasBottomContact() {
        return Physics2D.OverlapBoxAll(
            new Vector2(bc.bounds.center.x, bc.bounds.center.y - (crushLengthDetection / 2)),
            new Vector2(bc.size.x * boxCastScaleX, bc.size.y + crushLengthDetection),
            0,
            listContacts
        ).Length == 1;
    }

    public bool HasLeftContact() {
        return Physics2D.OverlapBoxAll(
            new Vector2(bc.bounds.min.x + (crushLengthDetection / 2), bc.bounds.center.y),
            new Vector2(crushLengthDetection + bc.size.x, bc.size.y * boxCastScaleY),
            0,
            listContacts
        ).Length == 1;
    }

    public bool HasRightContact() {
        return Physics2D.OverlapBoxAll(
            new Vector2(bc.bounds.min.x + (crushLengthDetection / 2), bc.bounds.center.y),
            new Vector2(crushLengthDetection + bc.size.x, bc.size.y * boxCastScaleY),
            0,
            listContacts
        ).Length == 1;
    }

    void OnDrawGizmos()
    {
        if (bc != null)
        {
            Gizmos.color = Color.magenta;
            Gizmos.DrawWireCube(
                new Vector2(bc.bounds.min.x + (crushLengthDetection / 2), bc.bounds.center.y),
                new Vector2(crushLengthDetection + bc.size.x, bc.size.y * boxCastScaleY)
            );
            Gizmos.DrawWireCube(
                new Vector2(bc.bounds.max.x - (crushLengthDetection / 2), bc.bounds.center.y),
                new Vector2(crushLengthDetection + bc.size.x, bc.size.y * boxCastScaleY)
            );

            Gizmos.color = Color.yellow;
            Gizmos.DrawWireCube(
                new Vector2(bc.bounds.center.x, bc.bounds.center.y - (crushLengthDetection / 2) - 0.05f),
                new Vector2(bc.size.x * boxCastScaleX, bc.size.y + crushLengthDetection + 0.05f)
            );
            // Top
            Gizmos.DrawWireCube(
                new Vector2(bc.bounds.center.x, bc.bounds.center.y + (crushLengthDetection / 2) + 0.05f),
                new Vector2(bc.size.x * boxCastScaleX, bc.size.y + crushLengthDetection - 0.05f)
            );
        }
    }
}
