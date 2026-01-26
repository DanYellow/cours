using UnityEngine.Events;
using UnityEngine;

public class RockHeadTrigger : MonoBehaviour
{
    public enum Corner
    {
        Left,
        TopLeft,
        BottomLeft,
        Right,
        TopRight,
        BottomRight,
        Top,
        Bottom,
    }

    [SerializeField]
    private Corner corner;

    [SerializeField]
    private BoxCollider2D bc;

    [HideInInspector]
    public GameObject rockHead = null;

    // Allow to call external methods when an action occurs within this script
    [SerializeField]
    private UnityEvent onTrigger;

    [SerializeField]
    private LayerMask rockHeadLayer;

    private float checkRadius = 0.1f;

    private Vector2 checkPosition;

    private void Awake()
    {
        checkPosition = GetCheckPosition();
    }

    private void FixedUpdate()
    {
        Collider2D hit = RockHeadTouched();
        if (hit != null && hit.gameObject == rockHead)
        {
            onTrigger?.Invoke();
            gameObject.SetActive(false);
        }
    }

    private Collider2D RockHeadTouched()
    {
        return Physics2D.OverlapCircle(
            checkPosition,
            checkRadius,
            rockHeadLayer
        );
    }

    private Vector2 GetCheckPosition()
    {
        switch (corner)
        {
            case Corner.Top:
                return new Vector2(bc.bounds.center.x, bc.bounds.max.y);
            case Corner.Bottom:
                return new Vector2(bc.bounds.center.x, bc.bounds.min.y);
            case Corner.TopLeft:
                return new Vector2(bc.bounds.min.x, bc.bounds.max.y);
            case Corner.BottomLeft:
                return new Vector2(bc.bounds.min.x, bc.bounds.min.y);
            case Corner.Left:
                return new Vector2(bc.bounds.min.x, bc.bounds.center.y);
            case Corner.TopRight:
                return new Vector2(bc.bounds.max.x, bc.bounds.max.y);
            case Corner.BottomRight:
                return new Vector2(bc.bounds.max.x, bc.bounds.min.y);
            case Corner.Right:
                return new Vector2(bc.bounds.max.x, bc.bounds.center.y);
            default:
                return new Vector2(bc.bounds.max.x, bc.bounds.center.y);
        }
    }

    private void OnDrawGizmos()
    {
        if (bc != null)
        {
            Gizmos.color = Color.red;

            Gizmos.DrawWireSphere(GetCheckPosition(), checkRadius);
        }
    }
}
