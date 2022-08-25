using UnityEngine;
using System.Collections;


public class CameraFollow : MonoBehaviour
{
    public GameObject player;
    public float delayBeforeFollowPlayer = 0;
    public Vector3 posOffset;
    private Vector3 _velocity;
    private Vector3 _nextPosition;
    private float _currentDelay;

    private bool _shouldFollowPlayer = true;
    private Vector3 _newTarget = Vector3.zero;
    private float _delayFocusHint = 3.0f;

    void Awake()
    {
        Terminal.onActivationDelegate += ScreenHint;
    }

    void Update()
    {
        if (_shouldFollowPlayer)
        {
            _nextPosition = player.transform.position + posOffset;
            _currentDelay = delayBeforeFollowPlayer;
        }
        else
        {
            _nextPosition = _newTarget;
            _currentDelay = _delayFocusHint;
        }

        transform.position = Vector3.SmoothDamp(
                transform.position,
                _nextPosition,
                ref _velocity,
                _currentDelay
            );
    }

    void ScreenHint(Vector2 pos)
    {
        _shouldFollowPlayer = false;
        _newTarget = new Vector3(pos.x, pos.y, transform.position.z);

        StartCoroutine(BackToPlayer());
    }

    IEnumerator BackToPlayer()
    {
        float delay = _delayFocusHint * 1.75f;
        yield return new WaitForSeconds((float)delay);
        _shouldFollowPlayer = true;
    }

    void OnDisable() {
        Terminal.onActivationDelegate -= ScreenHint;
    }
}
